import os

from webassets.ext.jinja2 import AssetsExtension
from webassets.filter import get_filter, register_filter
from webassets.filter.sass import Sass


class YarnSCSS(Sass):
    name = 'yarn-scss'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.args = [
            'yarn',
            'run',
            'node-scss',
            '--output-style',
            'expanded'
        ]

    def _apply_sass(self, _in, out, cd=None):
        child_cwd = cd or os.getcwd()
        return self.subprocess(self.args, out, _in, cwd=child_cwd)


class RollupJS(Sass):
    options = {
        'as_output': 'ROLLUP_OUTPUT',
        'load_paths': 'ROLLUP_LOAD_PATHS',
    }
    args = []
    name = 'rollupjs'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.args = [
            'yarn',
            'run',
            'rollup',
            '-f', 'iife',
            "-p", "'commonjs,postcss'",
            "-p", '"{{babel:{{babelHelpers:\'bundled\', exclude: \'node_modules/**\'}}}}"',
            "-p", "'node-resolve'",
        ]

    def _apply_sass(self, _in, out, cd=None):
        child_cwd = cd or os.getcwd()
        return self.subprocess(self.args, out, _in, cwd=child_cwd)


class RollupJSExtension(AssetsExtension):
    tags = set(['rollupjs'])

    # pylint: disable-next=redefined-builtin,too-many-arguments
    def _render_assets(self, filter, output, dbg, depends, files, caller=None):
        return super()._render_assets(
            "rollupjs",
            os.path.join("public", files[0]),
            dbg,
            depends,
            files,
            caller
        )


class SCSSExtension(AssetsExtension):
    tags = set(['scss'])

    # pylint: disable-next=redefined-builtin,too-many-arguments
    def _render_assets(self, filter, output, dbg, depends, files, caller=None):
        return super()._render_assets(
            "yarn-scss",
            os.path.join("public", files[0]).replace(".scss", ".css"),
            dbg,
            depends,
            files,
            caller
        )


try:
    get_filter(RollupJS.name)
    get_filter(YarnSCSS.name)
except ValueError:
    register_filter(RollupJS)
    register_filter(YarnSCSS)
