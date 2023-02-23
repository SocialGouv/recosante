(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  } // Polyfill for element.matches, to support Internet Explorer. It's a relatively
  // simple polyfill, so we'll just include it rather than require the user to
  // include the polyfill themselves. Adapted from
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill


  var matches = function matches(element, selector) {
    return element.matches ? element.matches(selector) : element.msMatchesSelector ? element.msMatchesSelector(selector) : element.webkitMatchesSelector ? element.webkitMatchesSelector(selector) : null;
  }; // Polyfill for element.closest, to support Internet Explorer. It's a relatively


  var closestPolyfill = function closestPolyfill(el, selector) {
    var element = el;

    while (element && element.nodeType === 1) {
      if (matches(element, selector)) {
        return element;
      }

      element = element.parentNode;
    }

    return null;
  };

  var closest = function closest(element, selector) {
    return element.closest ? element.closest(selector) : closestPolyfill(element, selector);
  }; // Returns true if the value has a "then" function. Adapted from
  // https://github.com/graphql/graphql-js/blob/499a75939f70c4863d44149371d6a99d57ff7c35/src/jsutils/isPromise.js


  var isPromise = function isPromise(value) {
    return Boolean(value && typeof value.then === 'function');
  };

  var AutocompleteCore = function AutocompleteCore() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        search = _ref.search,
        _ref$autoSelect = _ref.autoSelect,
        autoSelect = _ref$autoSelect === void 0 ? false : _ref$autoSelect,
        _ref$setValue = _ref.setValue,
        setValue = _ref$setValue === void 0 ? function () {} : _ref$setValue,
        _ref$setAttribute = _ref.setAttribute,
        setAttribute = _ref$setAttribute === void 0 ? function () {} : _ref$setAttribute,
        _ref$onUpdate = _ref.onUpdate,
        onUpdate = _ref$onUpdate === void 0 ? function () {} : _ref$onUpdate,
        _ref$onSubmit = _ref.onSubmit,
        onSubmit = _ref$onSubmit === void 0 ? function () {} : _ref$onSubmit,
        _ref$onShow = _ref.onShow,
        onShow = _ref$onShow === void 0 ? function () {} : _ref$onShow,
        _ref$onHide = _ref.onHide,
        onHide = _ref$onHide === void 0 ? function () {} : _ref$onHide,
        _ref$onLoading = _ref.onLoading,
        onLoading = _ref$onLoading === void 0 ? function () {} : _ref$onLoading,
        _ref$onLoaded = _ref.onLoaded,
        onLoaded = _ref$onLoaded === void 0 ? function () {} : _ref$onLoaded;

    _classCallCheck(this, AutocompleteCore);

    _defineProperty(this, "value", '');

    _defineProperty(this, "searchCounter", 0);

    _defineProperty(this, "results", []);

    _defineProperty(this, "selectedIndex", -1);

    _defineProperty(this, "handleInput", function (event) {
      var value = event.target.value;

      _this.updateResults(value);

      _this.value = value;
    });

    _defineProperty(this, "handleKeyDown", function (event) {
      var key = event.key;

      switch (key) {
        case 'Up': // IE/Edge

        case 'Down': // IE/Edge

        case 'ArrowUp':
        case 'ArrowDown':
          {
            var selectedIndex = key === 'ArrowUp' || key === 'Up' ? _this.selectedIndex - 1 : _this.selectedIndex + 1;
            event.preventDefault();

            _this.handleArrows(selectedIndex);

            break;
          }

        case 'Tab':
          {
            _this.selectResult();

            break;
          }

        case 'Enter':
          {
            var selectedResult = _this.results[_this.selectedIndex];

            _this.selectResult();

            _this.onSubmit(selectedResult);

            break;
          }

        case 'Esc': // IE/Edge

        case 'Escape':
          {
            _this.hideResults();

            _this.setValue();

            break;
          }

        default:
          return;
      }
    });

    _defineProperty(this, "handleFocus", function (event) {
      var value = event.target.value;

      _this.updateResults(value);

      _this.value = value;
    });

    _defineProperty(this, "handleBlur", function () {
      _this.hideResults();
    });

    _defineProperty(this, "handleResultMouseDown", function (event) {
      event.preventDefault();
    });

    _defineProperty(this, "handleResultClick", function (event) {
      var target = event.target;
      var result = closest(target, '[data-result-index]');

      if (result) {
        _this.selectedIndex = parseInt(result.dataset.resultIndex, 10);
        var selectedResult = _this.results[_this.selectedIndex];

        _this.selectResult();

        _this.onSubmit(selectedResult);
      }
    });

    _defineProperty(this, "handleArrows", function (selectedIndex) {
      // Loop selectedIndex back to first or last result if out of bounds
      var resultsCount = _this.results.length;
      _this.selectedIndex = (selectedIndex % resultsCount + resultsCount) % resultsCount; // Update results and aria attributes

      _this.onUpdate(_this.results, _this.selectedIndex);
    });

    _defineProperty(this, "selectResult", function () {
      var selectedResult = _this.results[_this.selectedIndex];

      if (selectedResult) {
        _this.setValue(selectedResult);
      }

      _this.hideResults();
    });

    _defineProperty(this, "updateResults", function (value) {
      var currentSearch = ++_this.searchCounter;

      _this.onLoading();

      _this.search(value).then(function (results) {
        if (currentSearch !== _this.searchCounter) {
          return;
        }

        _this.results = results;

        _this.onLoaded();

        if (_this.results.length === 0) {
          _this.hideResults();

          return;
        }

        _this.selectedIndex = _this.autoSelect ? 0 : -1;

        _this.onUpdate(_this.results, _this.selectedIndex);

        _this.showResults();
      });
    });

    _defineProperty(this, "showResults", function () {
      _this.setAttribute('aria-expanded', true);

      _this.onShow();
    });

    _defineProperty(this, "hideResults", function () {
      _this.selectedIndex = -1;
      _this.results = [];

      _this.setAttribute('aria-expanded', false);

      _this.setAttribute('aria-activedescendant', '');

      _this.onUpdate(_this.results, _this.selectedIndex);

      _this.onHide();
    });

    _defineProperty(this, "checkSelectedResultVisible", function (resultsElement) {
      var selectedResultElement = resultsElement.querySelector("[data-result-index=\"".concat(_this.selectedIndex, "\"]"));

      if (!selectedResultElement) {
        return;
      }

      var resultsPosition = resultsElement.getBoundingClientRect();
      var selectedPosition = selectedResultElement.getBoundingClientRect();

      if (selectedPosition.top < resultsPosition.top) {
        // Element is above viewable area
        resultsElement.scrollTop -= resultsPosition.top - selectedPosition.top;
      } else if (selectedPosition.bottom > resultsPosition.bottom) {
        // Element is below viewable area
        resultsElement.scrollTop += selectedPosition.bottom - resultsPosition.bottom;
      }
    });

    this.search = isPromise(search) ? search : function (value) {
      return Promise.resolve(search(value));
    };
    this.autoSelect = autoSelect;
    this.setValue = setValue;
    this.setAttribute = setAttribute;
    this.onUpdate = onUpdate;
    this.onSubmit = onSubmit;
    this.onShow = onShow;
    this.onHide = onHide;
    this.onLoading = onLoading;
    this.onLoaded = onLoaded;
  }; // Generates a unique ID, with optional prefix. Adapted from
  // https://github.com/lodash/lodash/blob/61acdd0c295e4447c9c10da04e287b1ebffe452c/uniqueId.js


  var idCounter = 0;

  var uniqueId = function uniqueId() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return "".concat(prefix).concat(++idCounter);
  }; // Calculates whether element2 should be above or below element1. Always
  // places element2 below unless all of the following:
  // 1. There isn't enough visible viewport below to fit element2
  // 2. There is more room above element1 than there is below
  // 3. Placing elemen2 above 1 won't overflow window


  var getRelativePosition = function getRelativePosition(element1, element2) {
    var position1 = element1.getBoundingClientRect();
    var position2 = element2.getBoundingClientRect();
    var positionAbove =
    /* 1 */
    position1.bottom + position2.height > window.innerHeight &&
    /* 2 */
    window.innerHeight - position1.bottom < position1.top &&
    /* 3 */
    window.pageYOffset + position1.top - position2.height > 0;
    return positionAbove ? 'above' : 'below';
  }; // Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.


  var debounce = function debounce(func, wait, immediate) {
    var timeout;
    return function executedFunction() {
      var context = this;
      var args = arguments;

      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }; // string in the format: `key1="value1" key2="value2"` for easy use in an HTML string.


  var Props = /*#__PURE__*/function () {
    function Props(index, selectedIndex, baseClass) {
      _classCallCheck(this, Props);

      this.id = "".concat(baseClass, "-result-").concat(index);
      this["class"] = "".concat(baseClass, "-result");
      this['data-result-index'] = index;
      this.role = 'option';

      if (index === selectedIndex) {
        this['aria-selected'] = 'true';
      }
    }

    _createClass(Props, [{
      key: "toString",
      value: function toString() {
        var _this = this;

        return Object.keys(this).reduce(function (str, key) {
          return "".concat(str, " ").concat(key, "=\"").concat(_this[key], "\"");
        }, '');
      }
    }]);

    return Props;
  }();

  var Autocomplete = function Autocomplete(root) {
    var _this2 = this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        search = _ref.search,
        _ref$onSubmit = _ref.onSubmit,
        onSubmit = _ref$onSubmit === void 0 ? function () {} : _ref$onSubmit,
        _ref$onUpdate = _ref.onUpdate,
        onUpdate = _ref$onUpdate === void 0 ? function () {} : _ref$onUpdate,
        _ref$baseClass = _ref.baseClass,
        baseClass = _ref$baseClass === void 0 ? 'autocomplete' : _ref$baseClass,
        autoSelect = _ref.autoSelect,
        _ref$getResultValue = _ref.getResultValue,
        getResultValue = _ref$getResultValue === void 0 ? function (result) {
      return result;
    } : _ref$getResultValue,
        renderResult = _ref.renderResult,
        _ref$debounceTime = _ref.debounceTime,
        debounceTime = _ref$debounceTime === void 0 ? 0 : _ref$debounceTime;

    _classCallCheck(this, Autocomplete);

    _defineProperty(this, "expanded", false);

    _defineProperty(this, "loading", false);

    _defineProperty(this, "position", {});

    _defineProperty(this, "resetPosition", true);

    _defineProperty(this, "initialize", function () {
      _this2.root.style.position = 'relative';

      _this2.input.setAttribute('role', 'combobox');

      _this2.input.setAttribute('autocomplete', 'off');

      _this2.input.setAttribute('autocapitalize', 'off');

      _this2.input.setAttribute('autocorrect', 'off');

      _this2.input.setAttribute('spellcheck', 'false');

      _this2.input.setAttribute('aria-autocomplete', 'list');

      _this2.input.setAttribute('aria-haspopup', 'listbox');

      _this2.input.setAttribute('aria-expanded', 'false');

      _this2.resultList.setAttribute('role', 'listbox');

      _this2.resultList.style.position = 'absolute';
      _this2.resultList.style.zIndex = '1';
      _this2.resultList.style.width = '100%';
      _this2.resultList.style.boxSizing = 'border-box'; // Generate ID for results list if it doesn't have one

      if (!_this2.resultList.id) {
        _this2.resultList.id = uniqueId("".concat(_this2.baseClass, "-result-list-"));
      }

      _this2.input.setAttribute('aria-owns', _this2.resultList.id);

      document.body.addEventListener('click', _this2.handleDocumentClick);

      _this2.input.addEventListener('input', _this2.core.handleInput);

      _this2.input.addEventListener('keydown', _this2.core.handleKeyDown);

      _this2.input.addEventListener('focus', _this2.core.handleFocus);

      _this2.input.addEventListener('blur', _this2.core.handleBlur);

      _this2.resultList.addEventListener('mousedown', _this2.core.handleResultMouseDown);

      _this2.resultList.addEventListener('click', _this2.core.handleResultClick);

      _this2.updateStyle();
    });

    _defineProperty(this, "setAttribute", function (attribute, value) {
      _this2.input.setAttribute(attribute, value);
    });

    _defineProperty(this, "setValue", function (result) {
      _this2.input.value = result ? _this2.getResultValue(result) : '';
    });

    _defineProperty(this, "renderResult", function (result, props) {
      return "<li ".concat(props, ">").concat(_this2.getResultValue(result), "</li>");
    });

    _defineProperty(this, "handleUpdate", function (results, selectedIndex) {
      _this2.resultList.innerHTML = '';
      results.forEach(function (result, index) {
        var props = new Props(index, selectedIndex, _this2.baseClass);

        var resultHTML = _this2.renderResult(result, props);

        if (typeof resultHTML === 'string') {
          _this2.resultList.insertAdjacentHTML('beforeend', resultHTML);
        } else {
          _this2.resultList.insertAdjacentElement('beforeend', resultHTML);
        }
      });

      _this2.input.setAttribute('aria-activedescendant', selectedIndex > -1 ? "".concat(_this2.baseClass, "-result-").concat(selectedIndex) : '');

      if (_this2.resetPosition) {
        _this2.resetPosition = false;
        _this2.position = getRelativePosition(_this2.input, _this2.resultList);

        _this2.updateStyle();
      }

      _this2.core.checkSelectedResultVisible(_this2.resultList);

      _this2.onUpdate(results, selectedIndex);
    });

    _defineProperty(this, "handleShow", function () {
      _this2.expanded = true;

      _this2.updateStyle();
    });

    _defineProperty(this, "handleHide", function () {
      _this2.expanded = false;
      _this2.resetPosition = true;

      _this2.updateStyle();
    });

    _defineProperty(this, "handleLoading", function () {
      _this2.loading = true;

      _this2.updateStyle();
    });

    _defineProperty(this, "handleLoaded", function () {
      _this2.loading = false;

      _this2.updateStyle();
    });

    _defineProperty(this, "handleDocumentClick", function (event) {
      if (_this2.root.contains(event.target)) {
        return;
      }

      _this2.core.hideResults();
    });

    _defineProperty(this, "updateStyle", function () {
      _this2.root.dataset.expanded = _this2.expanded;
      _this2.root.dataset.loading = _this2.loading;
      _this2.root.dataset.position = _this2.position;
      _this2.resultList.style.visibility = _this2.expanded ? 'visible' : 'hidden';
      _this2.resultList.style.pointerEvents = _this2.expanded ? 'auto' : 'none';

      if (_this2.position === 'below') {
        _this2.resultList.style.bottom = null;
        _this2.resultList.style.top = '100%';
      } else {
        _this2.resultList.style.top = null;
        _this2.resultList.style.bottom = '100%';
      }
    });

    this.root = typeof root === 'string' ? document.querySelector(root) : root;
    this.input = this.root.querySelector('input');
    this.resultList = this.root.querySelector('ul');
    this.baseClass = baseClass;
    this.getResultValue = getResultValue;
    this.onUpdate = onUpdate;

    if (typeof renderResult === 'function') {
      this.renderResult = renderResult;
    }

    var core = new AutocompleteCore({
      search: search,
      autoSelect: autoSelect,
      setValue: this.setValue,
      setAttribute: this.setAttribute,
      onUpdate: this.handleUpdate,
      onSubmit: onSubmit,
      onShow: this.handleShow,
      onHide: this.handleHide,
      onLoading: this.handleLoading,
      onLoaded: this.handleLoaded
    });

    if (debounceTime > 0) {
      core.handleInput = debounce(core.handleInput, debounceTime);
    }

    this.core = core;
    this.initialize();
  } // Set up aria attributes and events
  ;

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".autocomplete-input{border:1px solid #eee;border-radius:8px;width:100%;padding:12px 12px 12px 48px;box-sizing:border-box;position:relative;font-size:16px;line-height:1.5;flex:1;background-color:#eee;background-image:url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+\");background-repeat:no-repeat;background-position:12px}.autocomplete-input:focus,.autocomplete-input[aria-expanded=true]{border-color:rgba(0,0,0,.12);background-color:#fff;outline:none;box-shadow:0 2px 2px rgba(0,0,0,.16)}[data-position=below] .autocomplete-input[aria-expanded=true]{border-bottom-color:transparent;border-radius:8px 8px 0 0}[data-position=above] .autocomplete-input[aria-expanded=true]{border-top-color:transparent;border-radius:0 0 8px 8px;z-index:2}.autocomplete[data-loading=true]:after{content:\"\";border:3px solid rgba(0,0,0,.12);border-right-color:rgba(0,0,0,.48);border-radius:100%;width:20px;height:20px;position:absolute;right:12px;top:50%;transform:translateY(-50%);animation:rotate 1s linear infinite}.autocomplete-result-list{margin:0;border:1px solid rgba(0,0,0,.12);padding:0;box-sizing:border-box;max-height:296px;overflow-y:auto;background:#fff;list-style:none;box-shadow:0 2px 2px rgba(0,0,0,.16)}[data-position=below] .autocomplete-result-list{margin-top:-1px;border-top-color:transparent;border-radius:0 0 8px 8px;padding-bottom:8px}[data-position=above] .autocomplete-result-list{margin-bottom:-1px;border-bottom-color:transparent;border-radius:8px 8px 0 0;padding-top:8px}.autocomplete-result{cursor:default;padding:12px 12px 12px 48px;background-image:url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+\");background-repeat:no-repeat;background-position:12px}.autocomplete-result:hover,.autocomplete-result[aria-selected=true]{background-color:rgba(0,0,0,.06)}@keyframes rotate{0%{transform:translateY(-50%) rotate(0deg)}to{transform:translateY(-50%) rotate(359deg)}}";
  styleInject(css_248z);

  document.addEventListener("DOMContentLoaded", function(event) {
    const autocomplete = new Autocomplete('#ville_entree', {
      search: input => {
        const url = `https://geo.api.gouv.fr/communes?&boost=population&fields=nom,code&format=json&nom=${encodeURI(input)}`;

        return new Promise(resolve => {
          if (input.length < 3) {
            return resolve([])
          }

          fetch(url)
            .then(response => response.json())
            .then(data => {
              resolve(data);
            });
        })
      },
      getResultValue: result => result.nom,
      onSubmit: ville => {
        document.getElementById("ville_insee").value = ville.code;
        document.getElementById("ville_name").value = ville.nom;
      }
    });
    autocomplete.input.addEventListener('keydown', (event) => {
        const { key } = event;
        if (key == 'Enter') {
          event.preventDefault();
        }
    });

    const parent_telephone = document.getElementById('telephone').parentElement.parentElement;
    parent_telephone.setAttribute('hidden', "");
    for(const input of document.getElementsByName("diffusion")) {
      input.addEventListener('change', (event) => {
        if (event.target.value === 'sms') {
          parent_telephone.removeAttribute('hidden');
        } else {
          parent_telephone.setAttribute('hidden', "");
        }
      });
    }
  });

}());
