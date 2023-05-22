import typing

from marshmallow import ValidationError, fields


class TempList(fields.List):
    def _serialize(self, value: typing.Any, attr: str, obj: typing.Any, **kwargs):
        if value:
            # pylint: disable-next=protected-access
            return [self.inner._serialize(value, attr, obj, **kwargs)]
        return value

    # pylint: disable-next=line-too-long
    def _deserialize(self, value: typing.Any, attr: typing.Optional[str], data: typing.Optional[typing.Mapping[str, typing.Any]], **kwargs):
        if isinstance(value, list):
            if len(value) == 0:
                return None
            if len(value) == 1:
                return self.inner.deserialize(value[0])
            raise ValidationError(
                "There can be just one element for this field")
        return value
