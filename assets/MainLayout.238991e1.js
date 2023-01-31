import { c as createComponent, a as computed, h, b as hSlot, r as ref, i as isRuntimeSsrPreHydration, o as onMounted, d as onBeforeUnmount, n as noop, e as nextTick, g as getCurrentInstance, l as listenOpts, f as inject, j as emptyRenderFn, w as watch, k as hUniqueSlot, m as layoutKey, p as getScrollTarget, q as getVerticalScrollPosition, s as getHorizontalScrollPosition, P as Platform, t as createDirective, u as client, v as leftClick, x as addEvt, y as preventDraggable, z as prevent, A as stop, B as position, C as cleanEvt, D as stopAndPrevent, E as useDarkProps, F as useDark, G as debounce, H as onDeactivated, I as onActivated, J as hMergeSlot, K as withDirectives, L as setHorizontalScrollPosition, M as setVerticalScrollPosition, T as Transition, Q as QSpinner, N as useModelToggleProps, O as useModelToggleEmits, R as useTimeout, S as useModelToggle, U as useHistory, V as hDir, W as usePreventScroll, X as provide, Y as pageContainerKey, Z as getScrollbarWidth, _ as reactive, $ as onUnmounted, a0 as defineComponent, a1 as _export_sfc, a2 as openBlock, a3 as createBlock, a4 as withCtx, a5 as createVNode, a6 as QIcon, a7 as createCommentVNode, a8 as createTextVNode, a9 as toDisplayString, aa as Plugin, ab as isDate, ac as defaultLang, ad as resolveComponent, ae as QBtn, af as createBaseVNode, ag as QAvatar, ah as KeepAlive, ai as Ripple } from "./index.787b6272.js";
import { Q as QItemSection, a as QItemLabel, b as QItem, c as QList } from "./QItemLabel.33c28489.js";
var QToolbar = createComponent({
  name: "QToolbar",
  props: {
    inset: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => "q-toolbar row no-wrap items-center" + (props.inset === true ? " q-toolbar--inset" : "")
    );
    return () => h("div", { class: classes.value, role: "toolbar" }, hSlot(slots.default));
  }
});
function useCanRender() {
  const canRender = ref(!isRuntimeSsrPreHydration.value);
  if (canRender.value === false) {
    onMounted(() => {
      canRender.value = true;
    });
  }
  return canRender;
}
const hasObserver = typeof ResizeObserver !== "undefined";
const resizeProps = hasObserver === true ? {} : {
  style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
  url: "about:blank"
};
var QResizeObserver = createComponent({
  name: "QResizeObserver",
  props: {
    debounce: {
      type: [String, Number],
      default: 100
    }
  },
  emits: ["resize"],
  setup(props, { emit }) {
    let timer = null, targetEl, size = { width: -1, height: -1 };
    function trigger(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (timer === null) {
        timer = setTimeout(emitEvent, props.debounce);
      }
    }
    function emitEvent() {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      if (targetEl) {
        const { offsetWidth: width, offsetHeight: height } = targetEl;
        if (width !== size.width || height !== size.height) {
          size = { width, height };
          emit("resize", size);
        }
      }
    }
    const { proxy } = getCurrentInstance();
    if (hasObserver === true) {
      let observer;
      const init = (stop2) => {
        targetEl = proxy.$el.parentNode;
        if (targetEl) {
          observer = new ResizeObserver(trigger);
          observer.observe(targetEl);
          emitEvent();
        } else if (stop2 !== true) {
          nextTick(() => {
            init(true);
          });
        }
      };
      onMounted(() => {
        init();
      });
      onBeforeUnmount(() => {
        timer !== null && clearTimeout(timer);
        if (observer !== void 0) {
          if (observer.disconnect !== void 0) {
            observer.disconnect();
          } else if (targetEl) {
            observer.unobserve(targetEl);
          }
        }
      });
      return noop;
    } else {
      let cleanup = function() {
        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
        if (curDocView !== void 0) {
          if (curDocView.removeEventListener !== void 0) {
            curDocView.removeEventListener("resize", trigger, listenOpts.passive);
          }
          curDocView = void 0;
        }
      }, onObjLoad = function() {
        cleanup();
        if (targetEl && targetEl.contentDocument) {
          curDocView = targetEl.contentDocument.defaultView;
          curDocView.addEventListener("resize", trigger, listenOpts.passive);
          emitEvent();
        }
      };
      const canRender = useCanRender();
      let curDocView;
      onMounted(() => {
        nextTick(() => {
          targetEl = proxy.$el;
          targetEl && onObjLoad();
        });
      });
      onBeforeUnmount(cleanup);
      proxy.trigger = trigger;
      return () => {
        if (canRender.value === true) {
          return h("object", {
            style: resizeProps.style,
            tabindex: -1,
            type: "text/html",
            data: resizeProps.url,
            "aria-hidden": "true",
            onLoad: onObjLoad
          });
        }
      };
    }
  }
});
var QHeader = createComponent({
  name: "QHeader",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    revealOffset: {
      type: Number,
      default: 250
    },
    bordered: Boolean,
    elevated: Boolean,
    heightHint: {
      type: [String, Number],
      default: 50
    }
  },
  emits: ["reveal", "focusin"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QHeader needs to be child of QLayout");
      return emptyRenderFn;
    }
    const size = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);
    const fixed = computed(
      () => props.reveal === true || $layout.view.value.indexOf("H") > -1 || $q.platform.is.ios && $layout.isContainer.value === true
    );
    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0;
      }
      if (fixed.value === true) {
        return revealed.value === true ? size.value : 0;
      }
      const offset2 = size.value - $layout.scroll.value.position;
      return offset2 > 0 ? offset2 : 0;
    });
    const hidden = computed(
      () => props.modelValue !== true || fixed.value === true && revealed.value !== true
    );
    const revealOnFocus = computed(
      () => props.modelValue === true && hidden.value === true && props.reveal === true
    );
    const classes = computed(
      () => "q-header q-layout__section--marginal " + (fixed.value === true ? "fixed" : "absolute") + "-top" + (props.bordered === true ? " q-header--bordered" : "") + (hidden.value === true ? " q-header--hidden" : "") + (props.modelValue !== true ? " q-layout--prevent-focus" : "")
    );
    const style = computed(() => {
      const view = $layout.rows.value.top, css = {};
      if (view[0] === "l" && $layout.left.space === true) {
        css[$q.lang.rtl === true ? "right" : "left"] = `${$layout.left.size}px`;
      }
      if (view[2] === "r" && $layout.right.space === true) {
        css[$q.lang.rtl === true ? "left" : "right"] = `${$layout.right.size}px`;
      }
      return css;
    });
    function updateLayout(prop, val) {
      $layout.update("header", prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function onResize({ height }) {
      updateLocal(size, height);
      updateLayout("size", height);
    }
    function onFocusin(evt) {
      if (revealOnFocus.value === true) {
        updateLocal(revealed, true);
      }
      emit("focusin", evt);
    }
    watch(() => props.modelValue, (val) => {
      updateLayout("space", val);
      updateLocal(revealed, true);
      $layout.animate();
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(() => props.reveal, (val) => {
      val === false && updateLocal(revealed, props.modelValue);
    });
    watch(revealed, (val) => {
      $layout.animate();
      emit("reveal", val);
    });
    watch($layout.scroll, (scroll) => {
      props.reveal === true && updateLocal(
        revealed,
        scroll.direction === "up" || scroll.position <= props.revealOffset || scroll.position - scroll.inflectionPoint < 100
      );
    });
    const instance = {};
    $layout.instances.header = instance;
    props.modelValue === true && updateLayout("size", size.value);
    updateLayout("space", props.modelValue);
    updateLayout("offset", offset.value);
    onBeforeUnmount(() => {
      if ($layout.instances.header === instance) {
        $layout.instances.header = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = hUniqueSlot(slots.default, []);
      props.elevated === true && child.push(
        h("div", {
          class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
        })
      );
      child.push(
        h(QResizeObserver, {
          debounce: 0,
          onResize
        })
      );
      return h("header", {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child);
    };
  }
});
const { passive } = listenOpts;
const axisValues = ["both", "horizontal", "vertical"];
var QScrollObserver = createComponent({
  name: "QScrollObserver",
  props: {
    axis: {
      type: String,
      validator: (v) => axisValues.includes(v),
      default: "vertical"
    },
    debounce: [String, Number],
    scrollTarget: {
      default: void 0
    }
  },
  emits: ["scroll"],
  setup(props, { emit }) {
    const scroll = {
      position: {
        top: 0,
        left: 0
      },
      direction: "down",
      directionChanged: false,
      delta: {
        top: 0,
        left: 0
      },
      inflectionPoint: {
        top: 0,
        left: 0
      }
    };
    let clearTimer = null, localScrollTarget, parentEl;
    watch(() => props.scrollTarget, () => {
      unconfigureScrollTarget();
      configureScrollTarget();
    });
    function emitEvent() {
      clearTimer !== null && clearTimer();
      const top = Math.max(0, getVerticalScrollPosition(localScrollTarget));
      const left = getHorizontalScrollPosition(localScrollTarget);
      const delta = {
        top: top - scroll.position.top,
        left: left - scroll.position.left
      };
      if (props.axis === "vertical" && delta.top === 0 || props.axis === "horizontal" && delta.left === 0) {
        return;
      }
      const curDir = Math.abs(delta.top) >= Math.abs(delta.left) ? delta.top < 0 ? "up" : "down" : delta.left < 0 ? "left" : "right";
      scroll.position = { top, left };
      scroll.directionChanged = scroll.direction !== curDir;
      scroll.delta = delta;
      if (scroll.directionChanged === true) {
        scroll.direction = curDir;
        scroll.inflectionPoint = scroll.position;
      }
      emit("scroll", { ...scroll });
    }
    function configureScrollTarget() {
      localScrollTarget = getScrollTarget(parentEl, props.scrollTarget);
      localScrollTarget.addEventListener("scroll", trigger, passive);
      trigger(true);
    }
    function unconfigureScrollTarget() {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener("scroll", trigger, passive);
        localScrollTarget = void 0;
      }
    }
    function trigger(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (clearTimer === null) {
        const [timer, fn] = props.debounce ? [setTimeout(emitEvent, props.debounce), clearTimeout] : [requestAnimationFrame(emitEvent), cancelAnimationFrame];
        clearTimer = () => {
          fn(timer);
          clearTimer = null;
        };
      }
    }
    const { proxy } = getCurrentInstance();
    watch(() => proxy.$q.lang.rtl, emitEvent);
    onMounted(() => {
      parentEl = proxy.$el.parentNode;
      configureScrollTarget();
    });
    onBeforeUnmount(() => {
      clearTimer !== null && clearTimer();
      unconfigureScrollTarget();
    });
    Object.assign(proxy, {
      trigger,
      getPosition: () => scroll
    });
    return noop;
  }
});
const modifiersAll = {
  left: true,
  right: true,
  up: true,
  down: true,
  horizontal: true,
  vertical: true
};
const directionList = Object.keys(modifiersAll);
modifiersAll.all = true;
function getModifierDirections(mod2) {
  const dir = {};
  for (const direction of directionList) {
    if (mod2[direction] === true) {
      dir[direction] = true;
    }
  }
  if (Object.keys(dir).length === 0) {
    return modifiersAll;
  }
  if (dir.horizontal === true) {
    dir.left = dir.right = true;
  } else if (dir.left === true && dir.right === true) {
    dir.horizontal = true;
  }
  if (dir.vertical === true) {
    dir.up = dir.down = true;
  } else if (dir.up === true && dir.down === true) {
    dir.vertical = true;
  }
  if (dir.horizontal === true && dir.vertical === true) {
    dir.all = true;
  }
  return dir;
}
function shouldStart(evt, ctx) {
  return ctx.event === void 0 && evt.target !== void 0 && evt.target.draggable !== true && typeof ctx.handler === "function" && evt.target.nodeName.toUpperCase() !== "INPUT" && (evt.qClonedBy === void 0 || evt.qClonedBy.indexOf(ctx.uid) === -1);
}
function clearSelection() {
  if (window.getSelection !== void 0) {
    const selection = window.getSelection();
    if (selection.empty !== void 0) {
      selection.empty();
    } else if (selection.removeAllRanges !== void 0) {
      selection.removeAllRanges();
      Platform.is.mobile !== true && selection.addRange(document.createRange());
    }
  } else if (document.selection !== void 0) {
    document.selection.empty();
  }
}
function getChanges(evt, ctx, isFinal) {
  const pos = position(evt);
  let dir, distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y, absX = Math.abs(distX), absY = Math.abs(distY);
  const direction = ctx.direction;
  if (direction.horizontal === true && direction.vertical !== true) {
    dir = distX < 0 ? "left" : "right";
  } else if (direction.horizontal !== true && direction.vertical === true) {
    dir = distY < 0 ? "up" : "down";
  } else if (direction.up === true && distY < 0) {
    dir = "up";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.down === true && distY > 0) {
    dir = "down";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.left === true && distX < 0) {
    dir = "left";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  } else if (direction.right === true && distX > 0) {
    dir = "right";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  }
  let synthetic = false;
  if (dir === void 0 && isFinal === false) {
    if (ctx.event.isFirst === true || ctx.event.lastDir === void 0) {
      return {};
    }
    dir = ctx.event.lastDir;
    synthetic = true;
    if (dir === "left" || dir === "right") {
      pos.left -= distX;
      absX = 0;
      distX = 0;
    } else {
      pos.top -= distY;
      absY = 0;
      distY = 0;
    }
  }
  return {
    synthetic,
    payload: {
      evt,
      touch: ctx.event.mouse !== true,
      mouse: ctx.event.mouse === true,
      position: pos,
      direction: dir,
      isFirst: ctx.event.isFirst,
      isFinal: isFinal === true,
      duration: Date.now() - ctx.event.time,
      distance: {
        x: absX,
        y: absY
      },
      offset: {
        x: distX,
        y: distY
      },
      delta: {
        x: pos.left - ctx.event.lastX,
        y: pos.top - ctx.event.lastY
      }
    }
  };
}
let uid = 0;
var TouchPan = createDirective(
  {
    name: "touch-pan",
    beforeMount(el, { value: value2, modifiers }) {
      if (modifiers.mouse !== true && client.has.touch !== true) {
        return;
      }
      function handleEvent(evt, mouseEvent) {
        if (modifiers.mouse === true && mouseEvent === true) {
          stopAndPrevent(evt);
        } else {
          modifiers.stop === true && stop(evt);
          modifiers.prevent === true && prevent(evt);
        }
      }
      const ctx = {
        uid: "qvtp_" + uid++,
        handler: value2,
        modifiers,
        direction: getModifierDirections(modifiers),
        noop,
        mouseStart(evt) {
          if (shouldStart(evt, ctx) && leftClick(evt)) {
            addEvt(ctx, "temp", [
              [document, "mousemove", "move", "notPassiveCapture"],
              [document, "mouseup", "end", "passiveCapture"]
            ]);
            ctx.start(evt, true);
          }
        },
        touchStart(evt) {
          if (shouldStart(evt, ctx)) {
            const target = evt.target;
            addEvt(ctx, "temp", [
              [target, "touchmove", "move", "notPassiveCapture"],
              [target, "touchcancel", "end", "passiveCapture"],
              [target, "touchend", "end", "passiveCapture"]
            ]);
            ctx.start(evt);
          }
        },
        start(evt, mouseEvent) {
          client.is.firefox === true && preventDraggable(el, true);
          ctx.lastEvt = evt;
          if (mouseEvent === true || modifiers.stop === true) {
            if (ctx.direction.all !== true && (mouseEvent !== true || ctx.modifiers.mouseAllDir !== true && ctx.modifiers.mousealldir !== true)) {
              const clone2 = evt.type.indexOf("mouse") > -1 ? new MouseEvent(evt.type, evt) : new TouchEvent(evt.type, evt);
              evt.defaultPrevented === true && prevent(clone2);
              evt.cancelBubble === true && stop(clone2);
              Object.assign(clone2, {
                qKeyEvent: evt.qKeyEvent,
                qClickOutside: evt.qClickOutside,
                qAnchorHandled: evt.qAnchorHandled,
                qClonedBy: evt.qClonedBy === void 0 ? [ctx.uid] : evt.qClonedBy.concat(ctx.uid)
              });
              ctx.initialEvent = {
                target: evt.target,
                event: clone2
              };
            }
            stop(evt);
          }
          const { left, top } = position(evt);
          ctx.event = {
            x: left,
            y: top,
            time: Date.now(),
            mouse: mouseEvent === true,
            detected: false,
            isFirst: true,
            isFinal: false,
            lastX: left,
            lastY: top
          };
        },
        move(evt) {
          if (ctx.event === void 0) {
            return;
          }
          const pos = position(evt), distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y;
          if (distX === 0 && distY === 0) {
            return;
          }
          ctx.lastEvt = evt;
          const isMouseEvt = ctx.event.mouse === true;
          const start = () => {
            handleEvent(evt, isMouseEvt);
            let cursor;
            if (modifiers.preserveCursor !== true && modifiers.preservecursor !== true) {
              cursor = document.documentElement.style.cursor || "";
              document.documentElement.style.cursor = "grabbing";
            }
            isMouseEvt === true && document.body.classList.add("no-pointer-events--children");
            document.body.classList.add("non-selectable");
            clearSelection();
            ctx.styleCleanup = (withDelayedFn) => {
              ctx.styleCleanup = void 0;
              if (cursor !== void 0) {
                document.documentElement.style.cursor = cursor;
              }
              document.body.classList.remove("non-selectable");
              if (isMouseEvt === true) {
                const remove = () => {
                  document.body.classList.remove("no-pointer-events--children");
                };
                if (withDelayedFn !== void 0) {
                  setTimeout(() => {
                    remove();
                    withDelayedFn();
                  }, 50);
                } else {
                  remove();
                }
              } else if (withDelayedFn !== void 0) {
                withDelayedFn();
              }
            };
          };
          if (ctx.event.detected === true) {
            ctx.event.isFirst !== true && handleEvent(evt, ctx.event.mouse);
            const { payload, synthetic } = getChanges(evt, ctx, false);
            if (payload !== void 0) {
              if (ctx.handler(payload) === false) {
                ctx.end(evt);
              } else {
                if (ctx.styleCleanup === void 0 && ctx.event.isFirst === true) {
                  start();
                }
                ctx.event.lastX = payload.position.left;
                ctx.event.lastY = payload.position.top;
                ctx.event.lastDir = synthetic === true ? void 0 : payload.direction;
                ctx.event.isFirst = false;
              }
            }
            return;
          }
          if (ctx.direction.all === true || isMouseEvt === true && (ctx.modifiers.mouseAllDir === true || ctx.modifiers.mousealldir === true)) {
            start();
            ctx.event.detected = true;
            ctx.move(evt);
            return;
          }
          const absX = Math.abs(distX), absY = Math.abs(distY);
          if (absX !== absY) {
            if (ctx.direction.horizontal === true && absX > absY || ctx.direction.vertical === true && absX < absY || ctx.direction.up === true && absX < absY && distY < 0 || ctx.direction.down === true && absX < absY && distY > 0 || ctx.direction.left === true && absX > absY && distX < 0 || ctx.direction.right === true && absX > absY && distX > 0) {
              ctx.event.detected = true;
              ctx.move(evt);
            } else {
              ctx.end(evt, true);
            }
          }
        },
        end(evt, abort) {
          if (ctx.event === void 0) {
            return;
          }
          cleanEvt(ctx, "temp");
          client.is.firefox === true && preventDraggable(el, false);
          if (abort === true) {
            ctx.styleCleanup !== void 0 && ctx.styleCleanup();
            if (ctx.event.detected !== true && ctx.initialEvent !== void 0) {
              ctx.initialEvent.target.dispatchEvent(ctx.initialEvent.event);
            }
          } else if (ctx.event.detected === true) {
            ctx.event.isFirst === true && ctx.handler(getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx).payload);
            const { payload } = getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx, true);
            const fn = () => {
              ctx.handler(payload);
            };
            if (ctx.styleCleanup !== void 0) {
              ctx.styleCleanup(fn);
            } else {
              fn();
            }
          }
          ctx.event = void 0;
          ctx.initialEvent = void 0;
          ctx.lastEvt = void 0;
        }
      };
      el.__qtouchpan = ctx;
      if (modifiers.mouse === true) {
        const capture = modifiers.mouseCapture === true || modifiers.mousecapture === true ? "Capture" : "";
        addEvt(ctx, "main", [
          [el, "mousedown", "mouseStart", `passive${capture}`]
        ]);
      }
      client.has.touch === true && addEvt(ctx, "main", [
        [el, "touchstart", "touchStart", `passive${modifiers.capture === true ? "Capture" : ""}`],
        [el, "touchmove", "noop", "notPassiveCapture"]
      ]);
    },
    updated(el, bindings) {
      const ctx = el.__qtouchpan;
      if (ctx !== void 0) {
        if (bindings.oldValue !== bindings.value) {
          typeof value !== "function" && ctx.end();
          ctx.handler = bindings.value;
        }
        ctx.direction = getModifierDirections(bindings.modifiers);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qtouchpan;
      if (ctx !== void 0) {
        ctx.event !== void 0 && ctx.end();
        cleanEvt(ctx, "main");
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        ctx.styleCleanup !== void 0 && ctx.styleCleanup();
        delete el.__qtouchpan;
      }
    }
  }
);
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function between(v, min, max) {
  return max <= min ? min : Math.min(max, Math.max(min, v));
}
function pad(v, length = 2, char = "0") {
  if (v === void 0 || v === null) {
    return v;
  }
  const val = "" + v;
  return val.length >= length ? val : new Array(length - val.length + 1).join(char) + val;
}
const axisList = ["vertical", "horizontal"];
const dirProps = {
  vertical: { offset: "offsetY", scroll: "scrollTop", dir: "down", dist: "y" },
  horizontal: { offset: "offsetX", scroll: "scrollLeft", dir: "right", dist: "x" }
};
const panOpts = {
  prevent: true,
  mouse: true,
  mouseAllDir: true
};
const getMinThumbSize = (size) => size >= 250 ? 50 : Math.ceil(size / 5);
var QScrollArea = createComponent({
  name: "QScrollArea",
  props: {
    ...useDarkProps,
    thumbStyle: Object,
    verticalThumbStyle: Object,
    horizontalThumbStyle: Object,
    barStyle: [Array, String, Object],
    verticalBarStyle: [Array, String, Object],
    horizontalBarStyle: [Array, String, Object],
    contentStyle: [Array, String, Object],
    contentActiveStyle: [Array, String, Object],
    delay: {
      type: [String, Number],
      default: 1e3
    },
    visible: {
      type: Boolean,
      default: null
    },
    tabindex: [String, Number],
    onScroll: Function
  },
  setup(props, { slots, emit }) {
    const tempShowing = ref(false);
    const panning = ref(false);
    const hover = ref(false);
    const container = {
      vertical: ref(0),
      horizontal: ref(0)
    };
    const scroll = {
      vertical: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      },
      horizontal: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      }
    };
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    let timer = null, panRefPos;
    const targetRef = ref(null);
    const classes = computed(
      () => "q-scrollarea" + (isDark.value === true ? " q-scrollarea--dark" : "")
    );
    scroll.vertical.percentage = computed(() => {
      const diff = scroll.vertical.size.value - container.vertical.value;
      if (diff <= 0) {
        return 0;
      }
      const p = between(scroll.vertical.position.value / diff, 0, 1);
      return Math.round(p * 1e4) / 1e4;
    });
    scroll.vertical.thumbHidden = computed(
      () => (props.visible === null ? hover.value : props.visible) !== true && tempShowing.value === false && panning.value === false || scroll.vertical.size.value <= container.vertical.value + 1
    );
    scroll.vertical.thumbStart = computed(
      () => scroll.vertical.percentage.value * (container.vertical.value - scroll.vertical.thumbSize.value)
    );
    scroll.vertical.thumbSize = computed(
      () => Math.round(
        between(
          container.vertical.value * container.vertical.value / scroll.vertical.size.value,
          getMinThumbSize(container.vertical.value),
          container.vertical.value
        )
      )
    );
    scroll.vertical.style = computed(() => {
      return {
        ...props.thumbStyle,
        ...props.verticalThumbStyle,
        top: `${scroll.vertical.thumbStart.value}px`,
        height: `${scroll.vertical.thumbSize.value}px`
      };
    });
    scroll.vertical.thumbClass = computed(
      () => "q-scrollarea__thumb q-scrollarea__thumb--v absolute-right" + (scroll.vertical.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : "")
    );
    scroll.vertical.barClass = computed(
      () => "q-scrollarea__bar q-scrollarea__bar--v absolute-right" + (scroll.vertical.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : "")
    );
    scroll.horizontal.percentage = computed(() => {
      const diff = scroll.horizontal.size.value - container.horizontal.value;
      if (diff <= 0) {
        return 0;
      }
      const p = between(Math.abs(scroll.horizontal.position.value) / diff, 0, 1);
      return Math.round(p * 1e4) / 1e4;
    });
    scroll.horizontal.thumbHidden = computed(
      () => (props.visible === null ? hover.value : props.visible) !== true && tempShowing.value === false && panning.value === false || scroll.horizontal.size.value <= container.horizontal.value + 1
    );
    scroll.horizontal.thumbStart = computed(
      () => scroll.horizontal.percentage.value * (container.horizontal.value - scroll.horizontal.thumbSize.value)
    );
    scroll.horizontal.thumbSize = computed(
      () => Math.round(
        between(
          container.horizontal.value * container.horizontal.value / scroll.horizontal.size.value,
          getMinThumbSize(container.horizontal.value),
          container.horizontal.value
        )
      )
    );
    scroll.horizontal.style = computed(() => {
      return {
        ...props.thumbStyle,
        ...props.horizontalThumbStyle,
        [proxy.$q.lang.rtl === true ? "right" : "left"]: `${scroll.horizontal.thumbStart.value}px`,
        width: `${scroll.horizontal.thumbSize.value}px`
      };
    });
    scroll.horizontal.thumbClass = computed(
      () => "q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom" + (scroll.horizontal.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : "")
    );
    scroll.horizontal.barClass = computed(
      () => "q-scrollarea__bar q-scrollarea__bar--h absolute-bottom" + (scroll.horizontal.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : "")
    );
    const mainStyle = computed(() => scroll.vertical.thumbHidden.value === true && scroll.horizontal.thumbHidden.value === true ? props.contentStyle : props.contentActiveStyle);
    const thumbVertDir = [[
      TouchPan,
      (e) => {
        onPanThumb(e, "vertical");
      },
      void 0,
      { vertical: true, ...panOpts }
    ]];
    const thumbHorizDir = [[
      TouchPan,
      (e) => {
        onPanThumb(e, "horizontal");
      },
      void 0,
      { horizontal: true, ...panOpts }
    ]];
    function getScroll() {
      const info = {};
      axisList.forEach((axis) => {
        const data = scroll[axis];
        info[axis + "Position"] = data.position.value;
        info[axis + "Percentage"] = data.percentage.value;
        info[axis + "Size"] = data.size.value;
        info[axis + "ContainerSize"] = container[axis].value;
      });
      return info;
    }
    const emitScroll = debounce(() => {
      const info = getScroll();
      info.ref = proxy;
      emit("scroll", info);
    }, 0);
    function localSetScrollPosition(axis, offset, duration2) {
      if (axisList.includes(axis) === false) {
        console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");
        return;
      }
      const fn = axis === "vertical" ? setVerticalScrollPosition : setHorizontalScrollPosition;
      fn(targetRef.value, offset, duration2);
    }
    function updateContainer({ height, width }) {
      let change = false;
      if (container.vertical.value !== height) {
        container.vertical.value = height;
        change = true;
      }
      if (container.horizontal.value !== width) {
        container.horizontal.value = width;
        change = true;
      }
      change === true && startTimer();
    }
    function updateScroll({ position: position2 }) {
      let change = false;
      if (scroll.vertical.position.value !== position2.top) {
        scroll.vertical.position.value = position2.top;
        change = true;
      }
      if (scroll.horizontal.position.value !== position2.left) {
        scroll.horizontal.position.value = position2.left;
        change = true;
      }
      change === true && startTimer();
    }
    function updateScrollSize({ height, width }) {
      if (scroll.horizontal.size.value !== width) {
        scroll.horizontal.size.value = width;
        startTimer();
      }
      if (scroll.vertical.size.value !== height) {
        scroll.vertical.size.value = height;
        startTimer();
      }
    }
    function onPanThumb(e, axis) {
      const data = scroll[axis];
      if (e.isFirst === true) {
        if (data.thumbHidden.value === true) {
          return;
        }
        panRefPos = data.position.value;
        panning.value = true;
      } else if (panning.value !== true) {
        return;
      }
      if (e.isFinal === true) {
        panning.value = false;
      }
      const dProp = dirProps[axis];
      const containerSize = container[axis].value;
      const multiplier = (data.size.value - containerSize) / (containerSize - data.thumbSize.value);
      const distance = e.distance[dProp.dist];
      const pos = panRefPos + (e.direction === dProp.dir ? 1 : -1) * distance * multiplier;
      setScroll(pos, axis);
    }
    function onMousedown(evt, axis) {
      const data = scroll[axis];
      if (data.thumbHidden.value !== true) {
        const offset = evt[dirProps[axis].offset];
        if (offset < data.thumbStart.value || offset > data.thumbStart.value + data.thumbSize.value) {
          const pos = offset - data.thumbSize.value / 2;
          setScroll(pos / container[axis].value * data.size.value, axis);
        }
        if (data.ref.value !== null) {
          data.ref.value.dispatchEvent(new MouseEvent(evt.type, evt));
        }
      }
    }
    function onVerticalMousedown(evt) {
      onMousedown(evt, "vertical");
    }
    function onHorizontalMousedown(evt) {
      onMousedown(evt, "horizontal");
    }
    function startTimer() {
      tempShowing.value = true;
      timer !== null && clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        tempShowing.value = false;
      }, props.delay);
      props.onScroll !== void 0 && emitScroll();
    }
    function setScroll(offset, axis) {
      targetRef.value[dirProps[axis].scroll] = offset;
    }
    function onMouseenter() {
      hover.value = true;
    }
    function onMouseleave() {
      hover.value = false;
    }
    let scrollPosition = null;
    watch(() => proxy.$q.lang.rtl, (rtl) => {
      if (targetRef.value !== null) {
        setHorizontalScrollPosition(
          targetRef.value,
          Math.abs(scroll.horizontal.position.value) * (rtl === true ? -1 : 1)
        );
      }
    });
    onDeactivated(() => {
      scrollPosition = {
        top: scroll.vertical.position.value,
        left: scroll.horizontal.position.value
      };
    });
    onActivated(() => {
      if (scrollPosition === null) {
        return;
      }
      const scrollTarget = targetRef.value;
      if (scrollTarget !== null) {
        setHorizontalScrollPosition(scrollTarget, scrollPosition.left);
        setVerticalScrollPosition(scrollTarget, scrollPosition.top);
      }
    });
    onBeforeUnmount(emitScroll.cancel);
    Object.assign(proxy, {
      getScrollTarget: () => targetRef.value,
      getScroll,
      getScrollPosition: () => ({
        top: scroll.vertical.position.value,
        left: scroll.horizontal.position.value
      }),
      getScrollPercentage: () => ({
        top: scroll.vertical.percentage.value,
        left: scroll.horizontal.percentage.value
      }),
      setScrollPosition: localSetScrollPosition,
      setScrollPercentage(axis, percentage, duration2) {
        localSetScrollPosition(
          axis,
          percentage * (scroll[axis].size.value - container[axis].value) * (axis === "horizontal" && proxy.$q.lang.rtl === true ? -1 : 1),
          duration2
        );
      }
    });
    return () => {
      return h("div", {
        class: classes.value,
        onMouseenter,
        onMouseleave
      }, [
        h("div", {
          ref: targetRef,
          class: "q-scrollarea__container scroll relative-position fit hide-scrollbar",
          tabindex: props.tabindex !== void 0 ? props.tabindex : void 0
        }, [
          h("div", {
            class: "q-scrollarea__content absolute",
            style: mainStyle.value
          }, hMergeSlot(slots.default, [
            h(QResizeObserver, {
              debounce: 0,
              onResize: updateScrollSize
            })
          ])),
          h(QScrollObserver, {
            axis: "both",
            onScroll: updateScroll
          })
        ]),
        h(QResizeObserver, {
          debounce: 0,
          onResize: updateContainer
        }),
        h("div", {
          class: scroll.vertical.barClass.value,
          style: [props.barStyle, props.verticalBarStyle],
          "aria-hidden": "true",
          onMousedown: onVerticalMousedown
        }),
        h("div", {
          class: scroll.horizontal.barClass.value,
          style: [props.barStyle, props.horizontalBarStyle],
          "aria-hidden": "true",
          onMousedown: onHorizontalMousedown
        }),
        withDirectives(
          h("div", {
            ref: scroll.vertical.ref,
            class: scroll.vertical.thumbClass.value,
            style: scroll.vertical.style.value,
            "aria-hidden": "true"
          }),
          thumbVertDir
        ),
        withDirectives(
          h("div", {
            ref: scroll.horizontal.ref,
            class: scroll.horizontal.thumbClass.value,
            style: scroll.horizontal.style.value,
            "aria-hidden": "true"
          }),
          thumbHorizDir
        )
      ]);
    };
  }
});
const useRatioProps = {
  ratio: [String, Number]
};
function useRatio(props, naturalRatio) {
  return computed(() => {
    const ratio = Number(
      props.ratio || (naturalRatio !== void 0 ? naturalRatio.value : void 0)
    );
    return isNaN(ratio) !== true && ratio > 0 ? { paddingBottom: `${100 / ratio}%` } : null;
  });
}
const defaultRatio = 16 / 9;
var QImg = createComponent({
  name: "QImg",
  props: {
    ...useRatioProps,
    src: String,
    srcset: String,
    sizes: String,
    alt: String,
    crossorigin: String,
    decoding: String,
    referrerpolicy: String,
    draggable: Boolean,
    loading: {
      type: String,
      default: "lazy"
    },
    fetchpriority: {
      type: String,
      default: "auto"
    },
    width: String,
    height: String,
    initialRatio: {
      type: [Number, String],
      default: defaultRatio
    },
    placeholderSrc: String,
    fit: {
      type: String,
      default: "cover"
    },
    position: {
      type: String,
      default: "50% 50%"
    },
    imgClass: String,
    imgStyle: Object,
    noSpinner: Boolean,
    noNativeMenu: Boolean,
    noTransition: Boolean,
    spinnerColor: String,
    spinnerSize: String
  },
  emits: ["load", "error"],
  setup(props, { slots, emit }) {
    const naturalRatio = ref(props.initialRatio);
    const ratioStyle = useRatio(props, naturalRatio);
    let loadTimer = null, isDestroyed = false;
    const images = [
      ref(null),
      ref(getPlaceholderSrc())
    ];
    const position2 = ref(0);
    const isLoading = ref(false);
    const hasError = ref(false);
    const classes = computed(
      () => `q-img q-img--${props.noNativeMenu === true ? "no-" : ""}menu`
    );
    const style = computed(() => ({
      width: props.width,
      height: props.height
    }));
    const imgClass = computed(
      () => `q-img__image ${props.imgClass !== void 0 ? props.imgClass + " " : ""}q-img__image--with${props.noTransition === true ? "out" : ""}-transition`
    );
    const imgStyle = computed(() => ({
      ...props.imgStyle,
      objectFit: props.fit,
      objectPosition: props.position
    }));
    watch(() => getCurrentSrc(), addImage);
    function getCurrentSrc() {
      return props.src || props.srcset || props.sizes ? {
        src: props.src,
        srcset: props.srcset,
        sizes: props.sizes
      } : null;
    }
    function getPlaceholderSrc() {
      return props.placeholderSrc !== void 0 ? { src: props.placeholderSrc } : null;
    }
    function addImage(imgProps) {
      if (loadTimer !== null) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
      hasError.value = false;
      if (imgProps === null) {
        isLoading.value = false;
        images[position2.value ^ 1].value = getPlaceholderSrc();
      } else {
        isLoading.value = true;
      }
      images[position2.value].value = imgProps;
    }
    function onLoad({ target }) {
      if (isDestroyed === true) {
        return;
      }
      if (loadTimer !== null) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
      naturalRatio.value = target.naturalHeight === 0 ? 0.5 : target.naturalWidth / target.naturalHeight;
      waitForCompleteness(target, 1);
    }
    function waitForCompleteness(target, count) {
      if (isDestroyed === true || count === 1e3) {
        return;
      }
      if (target.complete === true) {
        onReady(target);
      } else {
        loadTimer = setTimeout(() => {
          loadTimer = null;
          waitForCompleteness(target, count + 1);
        }, 50);
      }
    }
    function onReady(img) {
      if (isDestroyed === true) {
        return;
      }
      position2.value = position2.value ^ 1;
      images[position2.value].value = null;
      isLoading.value = false;
      hasError.value = false;
      emit("load", img.currentSrc || img.src);
    }
    function onError(err) {
      if (loadTimer !== null) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
      isLoading.value = false;
      hasError.value = true;
      images[position2.value].value = null;
      images[position2.value ^ 1].value = getPlaceholderSrc();
      emit("error", err);
    }
    function getImage(index) {
      const img = images[index].value;
      const data = {
        key: "img_" + index,
        class: imgClass.value,
        style: imgStyle.value,
        crossorigin: props.crossorigin,
        decoding: props.decoding,
        referrerpolicy: props.referrerpolicy,
        height: props.height,
        width: props.width,
        loading: props.loading,
        fetchpriority: props.fetchpriority,
        "aria-hidden": "true",
        draggable: props.draggable,
        ...img
      };
      if (position2.value === index) {
        data.class += " q-img__image--waiting";
        Object.assign(data, { onLoad, onError });
      } else {
        data.class += " q-img__image--loaded";
      }
      return h(
        "div",
        { class: "q-img__container absolute-full", key: "img" + index },
        h("img", data)
      );
    }
    function getContent() {
      if (isLoading.value !== true) {
        return h("div", {
          key: "content",
          class: "q-img__content absolute-full q-anchor--skip"
        }, hSlot(slots[hasError.value === true ? "error" : "default"]));
      }
      return h("div", {
        key: "loading",
        class: "q-img__loading absolute-full flex flex-center"
      }, slots.loading !== void 0 ? slots.loading() : props.noSpinner === true ? void 0 : [
        h(QSpinner, {
          color: props.spinnerColor,
          size: props.spinnerSize
        })
      ]);
    }
    {
      {
        addImage(getCurrentSrc());
      }
      onBeforeUnmount(() => {
        isDestroyed = true;
        if (loadTimer !== null) {
          clearTimeout(loadTimer);
          loadTimer = null;
        }
      });
    }
    return () => {
      const content = [];
      if (ratioStyle.value !== null) {
        content.push(
          h("div", { key: "filler", style: ratioStyle.value })
        );
      }
      if (hasError.value !== true) {
        if (images[0].value !== null) {
          content.push(getImage(0));
        }
        if (images[1].value !== null) {
          content.push(getImage(1));
        }
      }
      content.push(
        h(Transition, { name: "q-transition--fade" }, getContent)
      );
      return h("div", {
        class: classes.value,
        style: style.value,
        role: "img",
        "aria-label": props.alt
      }, content);
    };
  }
});
const duration = 150;
var QDrawer = createComponent({
  name: "QDrawer",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useDarkProps,
    side: {
      type: String,
      default: "left",
      validator: (v) => ["left", "right"].includes(v)
    },
    width: {
      type: Number,
      default: 300
    },
    mini: Boolean,
    miniToOverlay: Boolean,
    miniWidth: {
      type: Number,
      default: 57
    },
    breakpoint: {
      type: Number,
      default: 1023
    },
    showIfAbove: Boolean,
    behavior: {
      type: String,
      validator: (v) => ["default", "desktop", "mobile"].includes(v),
      default: "default"
    },
    bordered: Boolean,
    elevated: Boolean,
    overlay: Boolean,
    persistent: Boolean,
    noSwipeOpen: Boolean,
    noSwipeClose: Boolean,
    noSwipeBackdrop: Boolean
  },
  emits: [
    ...useModelToggleEmits,
    "onLayout",
    "miniState"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const isDark = useDark(props, $q);
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout, removeTimeout } = useTimeout();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QDrawer needs to be child of QLayout");
      return emptyRenderFn;
    }
    let lastDesktopState, timerMini = null, layoutTotalWidthWatcher;
    const belowBreakpoint = ref(
      props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint
    );
    const isMini = computed(
      () => props.mini === true && belowBreakpoint.value !== true
    );
    const size = computed(() => isMini.value === true ? props.miniWidth : props.width);
    const showing = ref(
      props.showIfAbove === true && belowBreakpoint.value === false ? true : props.modelValue === true
    );
    const hideOnRouteChange = computed(
      () => props.persistent !== true && (belowBreakpoint.value === true || onScreenOverlay.value === true)
    );
    function handleShow(evt, noEvent) {
      addToHistory();
      evt !== false && $layout.animate();
      applyPosition(0);
      if (belowBreakpoint.value === true) {
        const otherInstance = $layout.instances[otherSide.value];
        if (otherInstance !== void 0 && otherInstance.belowBreakpoint === true) {
          otherInstance.hide(false);
        }
        applyBackdrop(1);
        $layout.isContainer.value !== true && preventBodyScroll(true);
      } else {
        applyBackdrop(0);
        evt !== false && setScrollable(false);
      }
      registerTimeout(() => {
        evt !== false && setScrollable(true);
        noEvent !== true && emit("show", evt);
      }, duration);
    }
    function handleHide(evt, noEvent) {
      removeFromHistory();
      evt !== false && $layout.animate();
      applyBackdrop(0);
      applyPosition(stateDirection.value * size.value);
      cleanup();
      if (noEvent !== true) {
        registerTimeout(() => {
          emit("hide", evt);
        }, duration);
      } else {
        removeTimeout();
      }
    }
    const { show, hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const instance = {
      belowBreakpoint,
      hide
    };
    const rightSide = computed(() => props.side === "right");
    const stateDirection = computed(
      () => ($q.lang.rtl === true ? -1 : 1) * (rightSide.value === true ? 1 : -1)
    );
    const flagBackdropBg = ref(0);
    const flagPanning = ref(false);
    const flagMiniAnimate = ref(false);
    const flagContentPosition = ref(
      size.value * stateDirection.value
    );
    const otherSide = computed(() => rightSide.value === true ? "left" : "right");
    const offset = computed(() => showing.value === true && belowBreakpoint.value === false && props.overlay === false ? props.miniToOverlay === true ? props.miniWidth : size.value : 0);
    const fixed = computed(
      () => props.overlay === true || props.miniToOverlay === true || $layout.view.value.indexOf(rightSide.value ? "R" : "L") > -1 || $q.platform.is.ios === true && $layout.isContainer.value === true
    );
    const onLayout = computed(
      () => props.overlay === false && showing.value === true && belowBreakpoint.value === false
    );
    const onScreenOverlay = computed(
      () => props.overlay === true && showing.value === true && belowBreakpoint.value === false
    );
    const backdropClass = computed(
      () => "fullscreen q-drawer__backdrop" + (showing.value === false && flagPanning.value === false ? " hidden" : "")
    );
    const backdropStyle = computed(() => ({
      backgroundColor: `rgba(0,0,0,${flagBackdropBg.value * 0.4})`
    }));
    const headerSlot = computed(() => rightSide.value === true ? $layout.rows.value.top[2] === "r" : $layout.rows.value.top[0] === "l");
    const footerSlot = computed(() => rightSide.value === true ? $layout.rows.value.bottom[2] === "r" : $layout.rows.value.bottom[0] === "l");
    const aboveStyle = computed(() => {
      const css = {};
      if ($layout.header.space === true && headerSlot.value === false) {
        if (fixed.value === true) {
          css.top = `${$layout.header.offset}px`;
        } else if ($layout.header.space === true) {
          css.top = `${$layout.header.size}px`;
        }
      }
      if ($layout.footer.space === true && footerSlot.value === false) {
        if (fixed.value === true) {
          css.bottom = `${$layout.footer.offset}px`;
        } else if ($layout.footer.space === true) {
          css.bottom = `${$layout.footer.size}px`;
        }
      }
      return css;
    });
    const style = computed(() => {
      const style2 = {
        width: `${size.value}px`,
        transform: `translateX(${flagContentPosition.value}px)`
      };
      return belowBreakpoint.value === true ? style2 : Object.assign(style2, aboveStyle.value);
    });
    const contentClass = computed(
      () => "q-drawer__content fit " + ($layout.isContainer.value !== true ? "scroll" : "overflow-auto")
    );
    const classes = computed(
      () => `q-drawer q-drawer--${props.side}` + (flagMiniAnimate.value === true ? " q-drawer--mini-animate" : "") + (props.bordered === true ? " q-drawer--bordered" : "") + (isDark.value === true ? " q-drawer--dark q-dark" : "") + (flagPanning.value === true ? " no-transition" : showing.value === true ? "" : " q-layout--prevent-focus") + (belowBreakpoint.value === true ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${isMini.value === true ? "mini" : "standard"}` + (fixed.value === true || onLayout.value !== true ? " fixed" : "") + (props.overlay === true || props.miniToOverlay === true ? " q-drawer--on-top" : "") + (headerSlot.value === true ? " q-drawer--top-padding" : ""))
    );
    const openDirective = computed(() => {
      const dir = $q.lang.rtl === true ? props.side : otherSide.value;
      return [[
        TouchPan,
        onOpenPan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const contentCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const backdropCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true,
          mouseAllDir: true
        }
      ]];
    });
    function updateBelowBreakpoint() {
      updateLocal(belowBreakpoint, props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint);
    }
    watch(belowBreakpoint, (val) => {
      if (val === true) {
        lastDesktopState = showing.value;
        showing.value === true && hide(false);
      } else if (props.overlay === false && props.behavior !== "mobile" && lastDesktopState !== false) {
        if (showing.value === true) {
          applyPosition(0);
          applyBackdrop(0);
          cleanup();
        } else {
          show(false);
        }
      }
    });
    watch(() => props.side, (newSide, oldSide) => {
      if ($layout.instances[oldSide] === instance) {
        $layout.instances[oldSide] = void 0;
        $layout[oldSide].space = false;
        $layout[oldSide].offset = 0;
      }
      $layout.instances[newSide] = instance;
      $layout[newSide].size = size.value;
      $layout[newSide].space = onLayout.value;
      $layout[newSide].offset = offset.value;
    });
    watch($layout.totalWidth, () => {
      if ($layout.isContainer.value === true || document.qScrollPrevented !== true) {
        updateBelowBreakpoint();
      }
    });
    watch(
      () => props.behavior + props.breakpoint,
      updateBelowBreakpoint
    );
    watch($layout.isContainer, (val) => {
      showing.value === true && preventBodyScroll(val !== true);
      val === true && updateBelowBreakpoint();
    });
    watch($layout.scrollbarWidth, () => {
      applyPosition(showing.value === true ? 0 : void 0);
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(onLayout, (val) => {
      emit("onLayout", val);
      updateLayout("space", val);
    });
    watch(rightSide, () => {
      applyPosition();
    });
    watch(size, (val) => {
      applyPosition();
      updateSizeOnLayout(props.miniToOverlay, val);
    });
    watch(() => props.miniToOverlay, (val) => {
      updateSizeOnLayout(val, size.value);
    });
    watch(() => $q.lang.rtl, () => {
      applyPosition();
    });
    watch(() => props.mini, () => {
      if (props.modelValue === true) {
        animateMini();
        $layout.animate();
      }
    });
    watch(isMini, (val) => {
      emit("miniState", val);
    });
    function applyPosition(position2) {
      if (position2 === void 0) {
        nextTick(() => {
          position2 = showing.value === true ? 0 : size.value;
          applyPosition(stateDirection.value * position2);
        });
      } else {
        if ($layout.isContainer.value === true && rightSide.value === true && (belowBreakpoint.value === true || Math.abs(position2) === size.value)) {
          position2 += stateDirection.value * $layout.scrollbarWidth.value;
        }
        flagContentPosition.value = position2;
      }
    }
    function applyBackdrop(x) {
      flagBackdropBg.value = x;
    }
    function setScrollable(v) {
      const action = v === true ? "remove" : $layout.isContainer.value !== true ? "add" : "";
      action !== "" && document.body.classList[action]("q-body--drawer-toggle");
    }
    function animateMini() {
      timerMini !== null && clearTimeout(timerMini);
      if (vm.proxy && vm.proxy.$el) {
        vm.proxy.$el.classList.add("q-drawer--mini-animate");
      }
      flagMiniAnimate.value = true;
      timerMini = setTimeout(() => {
        timerMini = null;
        flagMiniAnimate.value = false;
        if (vm && vm.proxy && vm.proxy.$el) {
          vm.proxy.$el.classList.remove("q-drawer--mini-animate");
        }
      }, 150);
    }
    function onOpenPan(evt) {
      if (showing.value !== false) {
        return;
      }
      const width = size.value, position2 = between(evt.distance.x, 0, width);
      if (evt.isFinal === true) {
        const opened = position2 >= Math.min(75, width);
        if (opened === true) {
          show();
        } else {
          $layout.animate();
          applyBackdrop(0);
          applyPosition(stateDirection.value * width);
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(
        ($q.lang.rtl === true ? rightSide.value !== true : rightSide.value) ? Math.max(width - position2, 0) : Math.min(0, position2 - width)
      );
      applyBackdrop(
        between(position2 / width, 0, 1)
      );
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function onClosePan(evt) {
      if (showing.value !== true) {
        return;
      }
      const width = size.value, dir = evt.direction === props.side, position2 = ($q.lang.rtl === true ? dir !== true : dir) ? between(evt.distance.x, 0, width) : 0;
      if (evt.isFinal === true) {
        const opened = Math.abs(position2) < Math.min(75, width);
        if (opened === true) {
          $layout.animate();
          applyBackdrop(1);
          applyPosition(0);
        } else {
          hide();
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(stateDirection.value * position2);
      applyBackdrop(between(1 - position2 / width, 0, 1));
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function cleanup() {
      preventBodyScroll(false);
      setScrollable(true);
    }
    function updateLayout(prop, val) {
      $layout.update(props.side, prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function updateSizeOnLayout(miniToOverlay, size2) {
      updateLayout("size", miniToOverlay === true ? props.miniWidth : size2);
    }
    $layout.instances[props.side] = instance;
    updateSizeOnLayout(props.miniToOverlay, size.value);
    updateLayout("space", onLayout.value);
    updateLayout("offset", offset.value);
    if (props.showIfAbove === true && props.modelValue !== true && showing.value === true && props["onUpdate:modelValue"] !== void 0) {
      emit("update:modelValue", true);
    }
    onMounted(() => {
      emit("onLayout", onLayout.value);
      emit("miniState", isMini.value);
      lastDesktopState = props.showIfAbove === true;
      const fn = () => {
        const action = showing.value === true ? handleShow : handleHide;
        action(false, true);
      };
      if ($layout.totalWidth.value !== 0) {
        nextTick(fn);
        return;
      }
      layoutTotalWidthWatcher = watch($layout.totalWidth, () => {
        layoutTotalWidthWatcher();
        layoutTotalWidthWatcher = void 0;
        if (showing.value === false && props.showIfAbove === true && belowBreakpoint.value === false) {
          show(false);
        } else {
          fn();
        }
      });
    });
    onBeforeUnmount(() => {
      layoutTotalWidthWatcher !== void 0 && layoutTotalWidthWatcher();
      if (timerMini !== null) {
        clearTimeout(timerMini);
        timerMini = null;
      }
      showing.value === true && cleanup();
      if ($layout.instances[props.side] === instance) {
        $layout.instances[props.side] = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = [];
      if (belowBreakpoint.value === true) {
        props.noSwipeOpen === false && child.push(
          withDirectives(
            h("div", {
              key: "open",
              class: `q-drawer__opener fixed-${props.side}`,
              "aria-hidden": "true"
            }),
            openDirective.value
          )
        );
        child.push(
          hDir(
            "div",
            {
              ref: "backdrop",
              class: backdropClass.value,
              style: backdropStyle.value,
              "aria-hidden": "true",
              onClick: hide
            },
            void 0,
            "backdrop",
            props.noSwipeBackdrop !== true && showing.value === true,
            () => backdropCloseDirective.value
          )
        );
      }
      const mini = isMini.value === true && slots.mini !== void 0;
      const content = [
        h(
          "div",
          {
            ...attrs,
            key: "" + mini,
            class: [
              contentClass.value,
              attrs.class
            ]
          },
          mini === true ? slots.mini() : hSlot(slots.default)
        )
      ];
      if (props.elevated === true && showing.value === true) {
        content.push(
          h("div", {
            class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
          })
        );
      }
      child.push(
        hDir(
          "aside",
          { ref: "content", class: classes.value, style: style.value },
          content,
          "contentclose",
          props.noSwipeClose !== true && belowBreakpoint.value === true,
          () => contentCloseDirective.value
        )
      );
      return h("div", { class: "q-drawer-container" }, child);
    };
  }
});
var QPageContainer = createComponent({
  name: "QPageContainer",
  setup(_, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QPageContainer needs to be child of QLayout");
      return emptyRenderFn;
    }
    provide(pageContainerKey, true);
    const style = computed(() => {
      const css = {};
      if ($layout.header.space === true) {
        css.paddingTop = `${$layout.header.size}px`;
      }
      if ($layout.right.space === true) {
        css[`padding${$q.lang.rtl === true ? "Left" : "Right"}`] = `${$layout.right.size}px`;
      }
      if ($layout.footer.space === true) {
        css.paddingBottom = `${$layout.footer.size}px`;
      }
      if ($layout.left.space === true) {
        css[`padding${$q.lang.rtl === true ? "Right" : "Left"}`] = `${$layout.left.size}px`;
      }
      return css;
    });
    return () => h("div", {
      class: "q-page-container",
      style: style.value
    }, hSlot(slots.default));
  }
});
var QLayout = createComponent({
  name: "QLayout",
  props: {
    container: Boolean,
    view: {
      type: String,
      default: "hhh lpr fff",
      validator: (v) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase())
    },
    onScroll: Function,
    onScrollHeight: Function,
    onResize: Function
  },
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const rootRef = ref(null);
    const height = ref($q.screen.height);
    const width = ref(props.container === true ? 0 : $q.screen.width);
    const scroll = ref({ position: 0, direction: "down", inflectionPoint: 0 });
    const containerHeight = ref(0);
    const scrollbarWidth = ref(isRuntimeSsrPreHydration.value === true ? 0 : getScrollbarWidth());
    const classes = computed(
      () => "q-layout q-layout--" + (props.container === true ? "containerized" : "standard")
    );
    const style = computed(() => props.container === false ? { minHeight: $q.screen.height + "px" } : null);
    const targetStyle = computed(() => scrollbarWidth.value !== 0 ? { [$q.lang.rtl === true ? "left" : "right"]: `${scrollbarWidth.value}px` } : null);
    const targetChildStyle = computed(() => scrollbarWidth.value !== 0 ? {
      [$q.lang.rtl === true ? "right" : "left"]: 0,
      [$q.lang.rtl === true ? "left" : "right"]: `-${scrollbarWidth.value}px`,
      width: `calc(100% + ${scrollbarWidth.value}px)`
    } : null);
    function onPageScroll(data) {
      if (props.container === true || document.qScrollPrevented !== true) {
        const info = {
          position: data.position.top,
          direction: data.direction,
          directionChanged: data.directionChanged,
          inflectionPoint: data.inflectionPoint.top,
          delta: data.delta.top
        };
        scroll.value = info;
        props.onScroll !== void 0 && emit("scroll", info);
      }
    }
    function onPageResize(data) {
      const { height: newHeight, width: newWidth } = data;
      let resized = false;
      if (height.value !== newHeight) {
        resized = true;
        height.value = newHeight;
        props.onScrollHeight !== void 0 && emit("scrollHeight", newHeight);
        updateScrollbarWidth();
      }
      if (width.value !== newWidth) {
        resized = true;
        width.value = newWidth;
      }
      if (resized === true && props.onResize !== void 0) {
        emit("resize", data);
      }
    }
    function onContainerResize({ height: height2 }) {
      if (containerHeight.value !== height2) {
        containerHeight.value = height2;
        updateScrollbarWidth();
      }
    }
    function updateScrollbarWidth() {
      if (props.container === true) {
        const width2 = height.value > containerHeight.value ? getScrollbarWidth() : 0;
        if (scrollbarWidth.value !== width2) {
          scrollbarWidth.value = width2;
        }
      }
    }
    let animateTimer = null;
    const $layout = {
      instances: {},
      view: computed(() => props.view),
      isContainer: computed(() => props.container),
      rootRef,
      height,
      containerHeight,
      scrollbarWidth,
      totalWidth: computed(() => width.value + scrollbarWidth.value),
      rows: computed(() => {
        const rows = props.view.toLowerCase().split(" ");
        return {
          top: rows[0].split(""),
          middle: rows[1].split(""),
          bottom: rows[2].split("")
        };
      }),
      header: reactive({ size: 0, offset: 0, space: false }),
      right: reactive({ size: 300, offset: 0, space: false }),
      footer: reactive({ size: 0, offset: 0, space: false }),
      left: reactive({ size: 300, offset: 0, space: false }),
      scroll,
      animate() {
        if (animateTimer !== null) {
          clearTimeout(animateTimer);
        } else {
          document.body.classList.add("q-body--layout-animate");
        }
        animateTimer = setTimeout(() => {
          animateTimer = null;
          document.body.classList.remove("q-body--layout-animate");
        }, 155);
      },
      update(part, prop, val) {
        $layout[part][prop] = val;
      }
    };
    provide(layoutKey, $layout);
    if (getScrollbarWidth() > 0) {
      let restoreScrollbar = function() {
        timer = null;
        el.classList.remove("hide-scrollbar");
      }, hideScrollbar = function() {
        if (timer === null) {
          if (el.scrollHeight > $q.screen.height) {
            return;
          }
          el.classList.add("hide-scrollbar");
        } else {
          clearTimeout(timer);
        }
        timer = setTimeout(restoreScrollbar, 300);
      }, updateScrollEvent = function(action) {
        if (timer !== null && action === "remove") {
          clearTimeout(timer);
          restoreScrollbar();
        }
        window[`${action}EventListener`]("resize", hideScrollbar);
      };
      let timer = null;
      const el = document.body;
      watch(
        () => props.container !== true ? "add" : "remove",
        updateScrollEvent
      );
      props.container !== true && updateScrollEvent("add");
      onUnmounted(() => {
        updateScrollEvent("remove");
      });
    }
    return () => {
      const content = hMergeSlot(slots.default, [
        h(QScrollObserver, { onScroll: onPageScroll }),
        h(QResizeObserver, { onResize: onPageResize })
      ]);
      const layout = h("div", {
        class: classes.value,
        style: style.value,
        ref: props.container === true ? void 0 : rootRef,
        tabindex: -1
      }, content);
      if (props.container === true) {
        return h("div", {
          class: "q-layout-container overflow-hidden",
          ref: rootRef
        }, [
          h(QResizeObserver, { onResize: onContainerResize }),
          h("div", {
            class: "absolute-full",
            style: targetStyle.value
          }, [
            h("div", {
              class: "scroll",
              style: targetChildStyle.value
            }, [layout])
          ])
        ]);
      }
      return layout;
    };
  }
});
const _sfc_main$1 = defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: "#"
    },
    icon: {
      type: String,
      default: ""
    }
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QItem, {
    clickable: "",
    tag: "a",
    target: "_blank",
    href: _ctx.link
  }, {
    default: withCtx(() => [
      _ctx.icon ? (openBlock(), createBlock(QItemSection, {
        key: 0,
        avatar: ""
      }, {
        default: withCtx(() => [
          createVNode(QIcon, { name: _ctx.icon }, null, 8, ["name"])
        ]),
        _: 1
      })) : createCommentVNode("", true),
      createVNode(QItemSection, null, {
        default: withCtx(() => [
          createVNode(QItemLabel, null, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ]),
            _: 1
          }),
          createVNode(QItemLabel, { caption: "" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.caption), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["href"]);
}
var EssentialLink = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "EssentialLink.vue"]]);
const breaks = [
  -61,
  9,
  38,
  199,
  426,
  686,
  756,
  818,
  1111,
  1181,
  1210,
  1635,
  2060,
  2097,
  2192,
  2262,
  2324,
  2394,
  2456,
  3178
];
function isLeapJalaaliYear(jy) {
  return jalCalLeap(jy) === 0;
}
function jalaaliMonthLength(jy, jm) {
  if (jm <= 6)
    return 31;
  if (jm <= 11)
    return 30;
  if (isLeapJalaaliYear(jy))
    return 30;
  return 29;
}
function jalCalLeap(jy) {
  const bl = breaks.length;
  let jp = breaks[0], jm, jump, leap, n, i;
  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new Error("Invalid Jalaali year " + jy);
  }
  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) {
      break;
    }
    jp = jm;
  }
  n = jy - jp;
  if (jump - n < 6) {
    n = n - jump + div(jump + 4, 33) * 33;
  }
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) {
    leap = 4;
  }
  return leap;
}
function div(a, b) {
  return ~~(a / b);
}
function mod(a, b) {
  return a - ~~(a / b) * b;
}
const MILLISECONDS_IN_DAY = 864e5, MILLISECONDS_IN_HOUR = 36e5, MILLISECONDS_IN_MINUTE = 6e4, defaultMask = "YYYY-MM-DDTHH:mm:ss.SSSZ", token = /\[((?:[^\]\\]|\\]|\\)*)\]|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g, reverseToken = /(\[[^\]]*\])|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g, regexStore = {};
function getRegexData(mask, dateLocale) {
  const days = "(" + dateLocale.days.join("|") + ")", key = mask + days;
  if (regexStore[key] !== void 0) {
    return regexStore[key];
  }
  const daysShort = "(" + dateLocale.daysShort.join("|") + ")", months = "(" + dateLocale.months.join("|") + ")", monthsShort = "(" + dateLocale.monthsShort.join("|") + ")";
  const map = {};
  let index = 0;
  const regexText = mask.replace(reverseToken, (match) => {
    index++;
    switch (match) {
      case "YY":
        map.YY = index;
        return "(-?\\d{1,2})";
      case "YYYY":
        map.YYYY = index;
        return "(-?\\d{1,4})";
      case "M":
        map.M = index;
        return "(\\d{1,2})";
      case "MM":
        map.M = index;
        return "(\\d{2})";
      case "MMM":
        map.MMM = index;
        return monthsShort;
      case "MMMM":
        map.MMMM = index;
        return months;
      case "D":
        map.D = index;
        return "(\\d{1,2})";
      case "Do":
        map.D = index++;
        return "(\\d{1,2}(st|nd|rd|th))";
      case "DD":
        map.D = index;
        return "(\\d{2})";
      case "H":
        map.H = index;
        return "(\\d{1,2})";
      case "HH":
        map.H = index;
        return "(\\d{2})";
      case "h":
        map.h = index;
        return "(\\d{1,2})";
      case "hh":
        map.h = index;
        return "(\\d{2})";
      case "m":
        map.m = index;
        return "(\\d{1,2})";
      case "mm":
        map.m = index;
        return "(\\d{2})";
      case "s":
        map.s = index;
        return "(\\d{1,2})";
      case "ss":
        map.s = index;
        return "(\\d{2})";
      case "S":
        map.S = index;
        return "(\\d{1})";
      case "SS":
        map.S = index;
        return "(\\d{2})";
      case "SSS":
        map.S = index;
        return "(\\d{3})";
      case "A":
        map.A = index;
        return "(AM|PM)";
      case "a":
        map.a = index;
        return "(am|pm)";
      case "aa":
        map.aa = index;
        return "(a\\.m\\.|p\\.m\\.)";
      case "ddd":
        return daysShort;
      case "dddd":
        return days;
      case "Q":
      case "d":
      case "E":
        return "(\\d{1})";
      case "Qo":
        return "(1st|2nd|3rd|4th)";
      case "DDD":
      case "DDDD":
        return "(\\d{1,3})";
      case "w":
        return "(\\d{1,2})";
      case "ww":
        return "(\\d{2})";
      case "Z":
        map.Z = index;
        return "(Z|[+-]\\d{2}:\\d{2})";
      case "ZZ":
        map.ZZ = index;
        return "(Z|[+-]\\d{2}\\d{2})";
      case "X":
        map.X = index;
        return "(-?\\d+)";
      case "x":
        map.x = index;
        return "(-?\\d{4,})";
      default:
        index--;
        if (match[0] === "[") {
          match = match.substring(1, match.length - 1);
        }
        return match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  });
  const res = { map, regex: new RegExp("^" + regexText) };
  regexStore[key] = res;
  return res;
}
function getDateLocale(paramDateLocale, langProps) {
  return paramDateLocale !== void 0 ? paramDateLocale : langProps !== void 0 ? langProps.date : defaultLang.date;
}
function formatTimezone(offset, delimeter = "") {
  const sign = offset > 0 ? "-" : "+", absOffset = Math.abs(offset), hours = Math.floor(absOffset / 60), minutes = absOffset % 60;
  return sign + pad(hours) + delimeter + pad(minutes);
}
function applyYearMonthDayChange(date2, mod2, sign) {
  let year = date2.getFullYear(), month = date2.getMonth();
  const day = date2.getDate();
  if (mod2.year !== void 0) {
    year += sign * mod2.year;
    delete mod2.year;
  }
  if (mod2.month !== void 0) {
    month += sign * mod2.month;
    delete mod2.month;
  }
  date2.setDate(1);
  date2.setMonth(2);
  date2.setFullYear(year);
  date2.setMonth(month);
  date2.setDate(Math.min(day, daysInMonth(date2)));
  if (mod2.date !== void 0) {
    date2.setDate(date2.getDate() + sign * mod2.date);
    delete mod2.date;
  }
  return date2;
}
function applyYearMonthDay(date2, mod2, middle) {
  const year = mod2.year !== void 0 ? mod2.year : date2[`get${middle}FullYear`](), month = mod2.month !== void 0 ? mod2.month - 1 : date2[`get${middle}Month`](), maxDay = new Date(year, month + 1, 0).getDate(), day = Math.min(maxDay, mod2.date !== void 0 ? mod2.date : date2[`get${middle}Date`]());
  date2[`set${middle}Date`](1);
  date2[`set${middle}Month`](2);
  date2[`set${middle}FullYear`](year);
  date2[`set${middle}Month`](month);
  date2[`set${middle}Date`](day);
  delete mod2.year;
  delete mod2.month;
  delete mod2.date;
  return date2;
}
function getChange(date2, rawMod, sign) {
  const mod2 = normalizeMod(rawMod), d = new Date(date2), t = mod2.year !== void 0 || mod2.month !== void 0 || mod2.date !== void 0 ? applyYearMonthDayChange(d, mod2, sign) : d;
  for (const key in mod2) {
    const op = capitalize(key);
    t[`set${op}`](t[`get${op}`]() + sign * mod2[key]);
  }
  return t;
}
function normalizeMod(mod2) {
  const acc = { ...mod2 };
  if (mod2.years !== void 0) {
    acc.year = mod2.years;
    delete acc.years;
  }
  if (mod2.months !== void 0) {
    acc.month = mod2.months;
    delete acc.months;
  }
  if (mod2.days !== void 0) {
    acc.date = mod2.days;
    delete acc.days;
  }
  if (mod2.day !== void 0) {
    acc.date = mod2.day;
    delete acc.day;
  }
  if (mod2.hour !== void 0) {
    acc.hours = mod2.hour;
    delete acc.hour;
  }
  if (mod2.minute !== void 0) {
    acc.minutes = mod2.minute;
    delete acc.minute;
  }
  if (mod2.second !== void 0) {
    acc.seconds = mod2.second;
    delete acc.second;
  }
  if (mod2.millisecond !== void 0) {
    acc.milliseconds = mod2.millisecond;
    delete acc.millisecond;
  }
  return acc;
}
function adjustDate(date2, rawMod, utc) {
  const mod2 = normalizeMod(rawMod), middle = utc === true ? "UTC" : "", d = new Date(date2), t = mod2.year !== void 0 || mod2.month !== void 0 || mod2.date !== void 0 ? applyYearMonthDay(d, mod2, middle) : d;
  for (const key in mod2) {
    const op = key.charAt(0).toUpperCase() + key.slice(1);
    t[`set${middle}${op}`](mod2[key]);
  }
  return t;
}
function extractDate(str, mask, dateLocale) {
  const d = __splitDate(str, mask, dateLocale);
  const date2 = new Date(
    d.year,
    d.month === null ? null : d.month - 1,
    d.day === null ? 1 : d.day,
    d.hour,
    d.minute,
    d.second,
    d.millisecond
  );
  const tzOffset = date2.getTimezoneOffset();
  return d.timezoneOffset === null || d.timezoneOffset === tzOffset ? date2 : getChange(date2, { minutes: d.timezoneOffset - tzOffset }, 1);
}
function __splitDate(str, mask, dateLocale, calendar, defaultModel) {
  const date2 = {
    year: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    second: null,
    millisecond: null,
    timezoneOffset: null,
    dateHash: null,
    timeHash: null
  };
  defaultModel !== void 0 && Object.assign(date2, defaultModel);
  if (str === void 0 || str === null || str === "" || typeof str !== "string") {
    return date2;
  }
  if (mask === void 0) {
    mask = defaultMask;
  }
  const langOpts = getDateLocale(dateLocale, Plugin.props), months = langOpts.months, monthsShort = langOpts.monthsShort;
  const { regex, map } = getRegexData(mask, langOpts);
  const match = str.match(regex);
  if (match === null) {
    return date2;
  }
  let tzString = "";
  if (map.X !== void 0 || map.x !== void 0) {
    const stamp = parseInt(match[map.X !== void 0 ? map.X : map.x], 10);
    if (isNaN(stamp) === true || stamp < 0) {
      return date2;
    }
    const d = new Date(stamp * (map.X !== void 0 ? 1e3 : 1));
    date2.year = d.getFullYear();
    date2.month = d.getMonth() + 1;
    date2.day = d.getDate();
    date2.hour = d.getHours();
    date2.minute = d.getMinutes();
    date2.second = d.getSeconds();
    date2.millisecond = d.getMilliseconds();
  } else {
    if (map.YYYY !== void 0) {
      date2.year = parseInt(match[map.YYYY], 10);
    } else if (map.YY !== void 0) {
      const y = parseInt(match[map.YY], 10);
      date2.year = y < 0 ? y : 2e3 + y;
    }
    if (map.M !== void 0) {
      date2.month = parseInt(match[map.M], 10);
      if (date2.month < 1 || date2.month > 12) {
        return date2;
      }
    } else if (map.MMM !== void 0) {
      date2.month = monthsShort.indexOf(match[map.MMM]) + 1;
    } else if (map.MMMM !== void 0) {
      date2.month = months.indexOf(match[map.MMMM]) + 1;
    }
    if (map.D !== void 0) {
      date2.day = parseInt(match[map.D], 10);
      if (date2.year === null || date2.month === null || date2.day < 1) {
        return date2;
      }
      const maxDay = calendar !== "persian" ? new Date(date2.year, date2.month, 0).getDate() : jalaaliMonthLength(date2.year, date2.month);
      if (date2.day > maxDay) {
        return date2;
      }
    }
    if (map.H !== void 0) {
      date2.hour = parseInt(match[map.H], 10) % 24;
    } else if (map.h !== void 0) {
      date2.hour = parseInt(match[map.h], 10) % 12;
      if (map.A && match[map.A] === "PM" || map.a && match[map.a] === "pm" || map.aa && match[map.aa] === "p.m.") {
        date2.hour += 12;
      }
      date2.hour = date2.hour % 24;
    }
    if (map.m !== void 0) {
      date2.minute = parseInt(match[map.m], 10) % 60;
    }
    if (map.s !== void 0) {
      date2.second = parseInt(match[map.s], 10) % 60;
    }
    if (map.S !== void 0) {
      date2.millisecond = parseInt(match[map.S], 10) * 10 ** (3 - match[map.S].length);
    }
    if (map.Z !== void 0 || map.ZZ !== void 0) {
      tzString = map.Z !== void 0 ? match[map.Z].replace(":", "") : match[map.ZZ];
      date2.timezoneOffset = (tzString[0] === "+" ? -1 : 1) * (60 * tzString.slice(1, 3) + 1 * tzString.slice(3, 5));
    }
  }
  date2.dateHash = pad(date2.year, 6) + "/" + pad(date2.month) + "/" + pad(date2.day);
  date2.timeHash = pad(date2.hour) + ":" + pad(date2.minute) + ":" + pad(date2.second) + tzString;
  return date2;
}
function isValid(date2) {
  return typeof date2 === "number" ? true : isNaN(Date.parse(date2)) === false;
}
function buildDate(mod2, utc) {
  return adjustDate(new Date(), mod2, utc);
}
function getDayOfWeek(date2) {
  const dow = new Date(date2).getDay();
  return dow === 0 ? 7 : dow;
}
function getWeekOfYear(date2) {
  const thursday = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  thursday.setDate(thursday.getDate() - (thursday.getDay() + 6) % 7 + 3);
  const firstThursday = new Date(thursday.getFullYear(), 0, 4);
  firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
  const ds = thursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  thursday.setHours(thursday.getHours() - ds);
  const weekDiff = (thursday - firstThursday) / (MILLISECONDS_IN_DAY * 7);
  return 1 + Math.floor(weekDiff);
}
function getDayIdentifier(date2) {
  return date2.getFullYear() * 1e4 + date2.getMonth() * 100 + date2.getDate();
}
function getDateIdentifier(date2, onlyDate) {
  const d = new Date(date2);
  return onlyDate === true ? getDayIdentifier(d) : d.getTime();
}
function isBetweenDates(date2, from, to, opts = {}) {
  const d1 = getDateIdentifier(from, opts.onlyDate), d2 = getDateIdentifier(to, opts.onlyDate), cur = getDateIdentifier(date2, opts.onlyDate);
  return (cur > d1 || opts.inclusiveFrom === true && cur === d1) && (cur < d2 || opts.inclusiveTo === true && cur === d2);
}
function addToDate(date2, mod2) {
  return getChange(date2, mod2, 1);
}
function subtractFromDate(date2, mod2) {
  return getChange(date2, mod2, -1);
}
function startOfDate(date2, unit, utc) {
  const t = new Date(date2), prefix = `set${utc === true ? "UTC" : ""}`;
  switch (unit) {
    case "year":
    case "years":
      t[`${prefix}Month`](0);
    case "month":
    case "months":
      t[`${prefix}Date`](1);
    case "day":
    case "days":
    case "date":
      t[`${prefix}Hours`](0);
    case "hour":
    case "hours":
      t[`${prefix}Minutes`](0);
    case "minute":
    case "minutes":
      t[`${prefix}Seconds`](0);
    case "second":
    case "seconds":
      t[`${prefix}Milliseconds`](0);
  }
  return t;
}
function endOfDate(date2, unit, utc) {
  const t = new Date(date2), prefix = `set${utc === true ? "UTC" : ""}`;
  switch (unit) {
    case "year":
    case "years":
      t[`${prefix}Month`](11);
    case "month":
    case "months":
      t[`${prefix}Date`](daysInMonth(t));
    case "day":
    case "days":
    case "date":
      t[`${prefix}Hours`](23);
    case "hour":
    case "hours":
      t[`${prefix}Minutes`](59);
    case "minute":
    case "minutes":
      t[`${prefix}Seconds`](59);
    case "second":
    case "seconds":
      t[`${prefix}Milliseconds`](999);
  }
  return t;
}
function getMaxDate(date2) {
  let t = new Date(date2);
  Array.prototype.slice.call(arguments, 1).forEach((d) => {
    t = Math.max(t, new Date(d));
  });
  return t;
}
function getMinDate(date2) {
  let t = new Date(date2);
  Array.prototype.slice.call(arguments, 1).forEach((d) => {
    t = Math.min(t, new Date(d));
  });
  return t;
}
function getDiff(t, sub, interval) {
  return (t.getTime() - t.getTimezoneOffset() * MILLISECONDS_IN_MINUTE - (sub.getTime() - sub.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)) / interval;
}
function getDateDiff(date2, subtract, unit = "days") {
  const t = new Date(date2), sub = new Date(subtract);
  switch (unit) {
    case "years":
    case "year":
      return t.getFullYear() - sub.getFullYear();
    case "months":
    case "month":
      return (t.getFullYear() - sub.getFullYear()) * 12 + t.getMonth() - sub.getMonth();
    case "days":
    case "day":
    case "date":
      return getDiff(startOfDate(t, "day"), startOfDate(sub, "day"), MILLISECONDS_IN_DAY);
    case "hours":
    case "hour":
      return getDiff(startOfDate(t, "hour"), startOfDate(sub, "hour"), MILLISECONDS_IN_HOUR);
    case "minutes":
    case "minute":
      return getDiff(startOfDate(t, "minute"), startOfDate(sub, "minute"), MILLISECONDS_IN_MINUTE);
    case "seconds":
    case "second":
      return getDiff(startOfDate(t, "second"), startOfDate(sub, "second"), 1e3);
  }
}
function getDayOfYear(date2) {
  return getDateDiff(date2, startOfDate(date2, "year"), "days") + 1;
}
function inferDateFormat(date2) {
  return isDate(date2) === true ? "date" : typeof date2 === "number" ? "number" : "string";
}
function getDateBetween(date2, min, max) {
  const t = new Date(date2);
  if (min) {
    const low = new Date(min);
    if (t < low) {
      return low;
    }
  }
  if (max) {
    const high = new Date(max);
    if (t > high) {
      return high;
    }
  }
  return t;
}
function isSameDate(date2, date22, unit) {
  const t = new Date(date2), d = new Date(date22);
  if (unit === void 0) {
    return t.getTime() === d.getTime();
  }
  switch (unit) {
    case "second":
    case "seconds":
      if (t.getSeconds() !== d.getSeconds()) {
        return false;
      }
    case "minute":
    case "minutes":
      if (t.getMinutes() !== d.getMinutes()) {
        return false;
      }
    case "hour":
    case "hours":
      if (t.getHours() !== d.getHours()) {
        return false;
      }
    case "day":
    case "days":
    case "date":
      if (t.getDate() !== d.getDate()) {
        return false;
      }
    case "month":
    case "months":
      if (t.getMonth() !== d.getMonth()) {
        return false;
      }
    case "year":
    case "years":
      if (t.getFullYear() !== d.getFullYear()) {
        return false;
      }
      break;
    default:
      throw new Error(`date isSameDate unknown unit ${unit}`);
  }
  return true;
}
function daysInMonth(date2) {
  return new Date(date2.getFullYear(), date2.getMonth() + 1, 0).getDate();
}
function getOrdinal(n) {
  if (n >= 11 && n <= 13) {
    return `${n}th`;
  }
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
  }
  return `${n}th`;
}
const formatter = {
  YY(date2, dateLocale, forcedYear) {
    const y = this.YYYY(date2, dateLocale, forcedYear) % 100;
    return y >= 0 ? pad(y) : "-" + pad(Math.abs(y));
  },
  YYYY(date2, _dateLocale, forcedYear) {
    return forcedYear !== void 0 && forcedYear !== null ? forcedYear : date2.getFullYear();
  },
  M(date2) {
    return date2.getMonth() + 1;
  },
  MM(date2) {
    return pad(date2.getMonth() + 1);
  },
  MMM(date2, dateLocale) {
    return dateLocale.monthsShort[date2.getMonth()];
  },
  MMMM(date2, dateLocale) {
    return dateLocale.months[date2.getMonth()];
  },
  Q(date2) {
    return Math.ceil((date2.getMonth() + 1) / 3);
  },
  Qo(date2) {
    return getOrdinal(this.Q(date2));
  },
  D(date2) {
    return date2.getDate();
  },
  Do(date2) {
    return getOrdinal(date2.getDate());
  },
  DD(date2) {
    return pad(date2.getDate());
  },
  DDD(date2) {
    return getDayOfYear(date2);
  },
  DDDD(date2) {
    return pad(getDayOfYear(date2), 3);
  },
  d(date2) {
    return date2.getDay();
  },
  dd(date2, dateLocale) {
    return this.dddd(date2, dateLocale).slice(0, 2);
  },
  ddd(date2, dateLocale) {
    return dateLocale.daysShort[date2.getDay()];
  },
  dddd(date2, dateLocale) {
    return dateLocale.days[date2.getDay()];
  },
  E(date2) {
    return date2.getDay() || 7;
  },
  w(date2) {
    return getWeekOfYear(date2);
  },
  ww(date2) {
    return pad(getWeekOfYear(date2));
  },
  H(date2) {
    return date2.getHours();
  },
  HH(date2) {
    return pad(date2.getHours());
  },
  h(date2) {
    const hours = date2.getHours();
    return hours === 0 ? 12 : hours > 12 ? hours % 12 : hours;
  },
  hh(date2) {
    return pad(this.h(date2));
  },
  m(date2) {
    return date2.getMinutes();
  },
  mm(date2) {
    return pad(date2.getMinutes());
  },
  s(date2) {
    return date2.getSeconds();
  },
  ss(date2) {
    return pad(date2.getSeconds());
  },
  S(date2) {
    return Math.floor(date2.getMilliseconds() / 100);
  },
  SS(date2) {
    return pad(Math.floor(date2.getMilliseconds() / 10));
  },
  SSS(date2) {
    return pad(date2.getMilliseconds(), 3);
  },
  A(date2) {
    return this.H(date2) < 12 ? "AM" : "PM";
  },
  a(date2) {
    return this.H(date2) < 12 ? "am" : "pm";
  },
  aa(date2) {
    return this.H(date2) < 12 ? "a.m." : "p.m.";
  },
  Z(date2, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date2.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset, ":");
  },
  ZZ(date2, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date2.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset);
  },
  X(date2) {
    return Math.floor(date2.getTime() / 1e3);
  },
  x(date2) {
    return date2.getTime();
  }
};
function formatDate(val, mask, dateLocale, __forcedYear, __forcedTimezoneOffset) {
  if (val !== 0 && !val || val === Infinity || val === -Infinity) {
    return;
  }
  const date2 = new Date(val);
  if (isNaN(date2)) {
    return;
  }
  if (mask === void 0) {
    mask = defaultMask;
  }
  const locale = getDateLocale(dateLocale, Plugin.props);
  return mask.replace(
    token,
    (match, text) => match in formatter ? formatter[match](date2, locale, __forcedYear, __forcedTimezoneOffset) : text === void 0 ? match : text.split("\\]").join("]")
  );
}
function clone(date2) {
  return isDate(date2) === true ? new Date(date2.getTime()) : date2;
}
var date = {
  isValid,
  extractDate,
  buildDate,
  getDayOfWeek,
  getWeekOfYear,
  isBetweenDates,
  addToDate,
  subtractFromDate,
  adjustDate,
  startOfDate,
  endOfDate,
  getMaxDate,
  getMinDate,
  getDateDiff,
  getDayOfYear,
  inferDateFormat,
  getDateBetween,
  isSameDate,
  daysInMonth,
  formatDate,
  clone
};
var MainLayout_vue_vue_type_style_index_0_lang = "";
const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev"
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework"
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev"
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev"
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev"
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev"
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev"
  }
];
const _sfc_main = defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink
  },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  },
  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "dddd D MMMM");
    }
  }
});
const _hoisted_1 = { class: "q-px-lg q-pt-xl q-mb-md" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h3" }, "Tasks", -1);
const _hoisted_3 = { class: "text-subtitlel" };
const _hoisted_4 = { class: "absolute-bottom bg-transparent" };
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("img", { src: "ip.jpg" }, null, -1);
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-bold" }, "Cindy Zacarias", -1);
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("div", null, "@Cindy_Zacarias", -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(QLayout, { view: "lHh Lpr lFf" }, {
    default: withCtx(() => [
      createVNode(QHeader, null, {
        default: withCtx(() => [
          createVNode(QToolbar, null, {
            default: withCtx(() => [
              createVNode(QBtn, {
                flat: "",
                dense: "",
                round: "",
                icon: "menu",
                "aria-label": "Menu",
                onClick: _ctx.toggleLeftDrawer
              }, null, 8, ["onClick"])
            ]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_1, [
            _hoisted_2,
            createBaseVNode("div", _hoisted_3, toDisplayString(_ctx.todaysDate), 1)
          ])
        ]),
        _: 1
      }),
      createVNode(QDrawer, {
        modelValue: _ctx.leftDrawerOpen,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.leftDrawerOpen = $event),
        "show-if-above": "",
        width: 250,
        breakpoint: 600
      }, {
        default: withCtx(() => [
          createVNode(QScrollArea, { style: { "height": "calc(100% - 150px)", "margin-top": "150px", "border-right": "1px solid #ddd" } }, {
            default: withCtx(() => [
              createVNode(QList, { padding: "" }, {
                default: withCtx(() => [
                  withDirectives((openBlock(), createBlock(QItem, {
                    to: "/",
                    clickable: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QIcon, { name: "List" })
                        ]),
                        _: 1
                      }),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createTextVNode(" List ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })), [
                    [Ripple]
                  ]),
                  withDirectives((openBlock(), createBlock(QItem, {
                    to: "/help",
                    exact: "",
                    clickable: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QIcon, { name: "help" })
                        ]),
                        _: 1
                      }),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createTextVNode(" help ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })), [
                    [Ripple]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QImg, {
            class: "absolute-top",
            src: "https://4.bp.blogspot.com/-nh7t3e7yC1U/Vs3BJQKqv9I/AAAAAAAAAlk/FujpekavCk0/w1200-h630-p-k-no-nu/inspira%25C3%25A7%25C3%25A3o16.jpg",
            style: { "height": "150px" }
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_4, [
                createVNode(QAvatar, {
                  size: "56px",
                  class: "q-mb-sm"
                }, {
                  default: withCtx(() => [
                    _hoisted_5
                  ]),
                  _: 1
                }),
                _hoisted_6,
                _hoisted_7
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createVNode(QPageContainer, null, {
        default: withCtx(() => [
          (openBlock(), createBlock(KeepAlive, null, [
            createVNode(_component_router_view)
          ], 1024))
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "MainLayout.vue"]]);
export { MainLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkxheW91dC4yMzg5OTFlMS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90b29sYmFyL1FUb29sYmFyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtY2FuLXJlbmRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvcmVzaXplLW9ic2VydmVyL1FSZXNpemVPYnNlcnZlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaGVhZGVyL1FIZWFkZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3Njcm9sbC1vYnNlcnZlci9RU2Nyb2xsT2JzZXJ2ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL3RvdWNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9zZWxlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9kaXJlY3RpdmVzL1RvdWNoUGFuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvZm9ybWF0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zY3JvbGwtYXJlYS9RU2Nyb2xsQXJlYS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJhdGlvLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pbWcvUUltZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvZHJhd2VyL1FEcmF3ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3BhZ2UvUVBhZ2VDb250YWluZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2xheW91dC9RTGF5b3V0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRXNzZW50aWFsTGluay52dWUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL2RhdGUtcGVyc2lhbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL2RhdGUuanMiLCIuLi8uLi8uLi9zcmMvbGF5b3V0cy9NYWluTGF5b3V0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRvb2xiYXInLFxuXG4gIHByb3BzOiB7XG4gICAgaW5zZXQ6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdG9vbGJhciByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICArIChwcm9wcy5pbnNldCA9PT0gdHJ1ZSA/ICcgcS10b29sYmFyLS1pbnNldCcgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSwgcm9sZTogJ3Rvb2xiYXInIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQgfSBmcm9tICd2dWUnXG5cbi8vIHVzaW5nIGl0IHRvIG1hbmFnZSBTU1IgcmVuZGVyaW5nIHdpdGggYmVzdCBwZXJmb3JtYW5jZVxuaW1wb3J0IHsgaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uIH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCBjYW5SZW5kZXIgPSByZWYoIWlzUnVudGltZVNzclByZUh5ZHJhdGlvbi52YWx1ZSlcblxuICBpZiAoY2FuUmVuZGVyLnZhbHVlID09PSBmYWxzZSkge1xuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICBjYW5SZW5kZXIudmFsdWUgPSB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBjYW5SZW5kZXJcbn1cbiIsImltcG9ydCB7IGgsIG9uTW91bnRlZCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UsIG5leHRUaWNrIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlQ2FuUmVuZGVyIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWNhbi1yZW5kZXIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgbGlzdGVuT3B0cywgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuXG5jb25zdCBoYXNPYnNlcnZlciA9IHR5cGVvZiBSZXNpemVPYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCdcbmNvbnN0IHJlc2l6ZVByb3BzID0gaGFzT2JzZXJ2ZXIgPT09IHRydWVcbiAgPyB7fVxuICA6IHtcbiAgICAgIHN0eWxlOiAnZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtib3R0b206MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO292ZXJmbG93OmhpZGRlbjtwb2ludGVyLWV2ZW50czpub25lO3otaW5kZXg6LTE7JyxcbiAgICAgIHVybDogJ2Fib3V0OmJsYW5rJ1xuICAgIH1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FSZXNpemVPYnNlcnZlcicsXG5cbiAgcHJvcHM6IHtcbiAgICBkZWJvdW5jZToge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogMTAwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdyZXNpemUnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IGVtaXQgfSkge1xuICAgIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18pIHsgcmV0dXJuIG5vb3AgfVxuXG4gICAgbGV0IHRpbWVyID0gbnVsbCwgdGFyZ2V0RWwsIHNpemUgPSB7IHdpZHRoOiAtMSwgaGVpZ2h0OiAtMSB9XG5cbiAgICBmdW5jdGlvbiB0cmlnZ2VyIChpbW1lZGlhdGVseSkge1xuICAgICAgaWYgKGltbWVkaWF0ZWx5ID09PSB0cnVlIHx8IHByb3BzLmRlYm91bmNlID09PSAwIHx8IHByb3BzLmRlYm91bmNlID09PSAnMCcpIHtcbiAgICAgICAgZW1pdEV2ZW50KClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRpbWVyID09PSBudWxsKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChlbWl0RXZlbnQsIHByb3BzLmRlYm91bmNlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXRFdmVudCAoKSB7XG4gICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldEVsKSB7XG4gICAgICAgIGNvbnN0IHsgb2Zmc2V0V2lkdGg6IHdpZHRoLCBvZmZzZXRIZWlnaHQ6IGhlaWdodCB9ID0gdGFyZ2V0RWxcblxuICAgICAgICBpZiAod2lkdGggIT09IHNpemUud2lkdGggfHwgaGVpZ2h0ICE9PSBzaXplLmhlaWdodCkge1xuICAgICAgICAgIHNpemUgPSB7IHdpZHRoLCBoZWlnaHQgfVxuICAgICAgICAgIGVtaXQoJ3Jlc2l6ZScsIHNpemUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgaWYgKGhhc09ic2VydmVyID09PSB0cnVlKSB7XG4gICAgICBsZXQgb2JzZXJ2ZXJcblxuICAgICAgLy8gaW5pdGlhbGl6ZSBhcyBzb29uIGFzIHBvc3NpYmxlXG4gICAgICBjb25zdCBpbml0ID0gc3RvcCA9PiB7XG4gICAgICAgIHRhcmdldEVsID0gcHJveHkuJGVsLnBhcmVudE5vZGVcblxuICAgICAgICBpZiAodGFyZ2V0RWwpIHtcbiAgICAgICAgICBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcih0cmlnZ2VyKVxuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0RWwpXG4gICAgICAgICAgZW1pdEV2ZW50KClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdG9wICE9PSB0cnVlKSB7XG4gICAgICAgICAgbmV4dFRpY2soKCkgPT4geyBpbml0KHRydWUpIH0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb25Nb3VudGVkKCgpID0+IHsgaW5pdCgpIH0pXG5cbiAgICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICAgIHRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dCh0aW1lcilcblxuICAgICAgICBpZiAob2JzZXJ2ZXIgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGlmIChvYnNlcnZlci5kaXNjb25uZWN0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh0YXJnZXRFbCkgeyAvLyBGRiBmb3IgQW5kcm9pZFxuICAgICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKHRhcmdldEVsKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9XG4gICAgZWxzZSB7IC8vIG5vIG9ic2VydmVyLCBzbyBmYWxsYmFjayB0byBvbGQgaWZyYW1lIG1ldGhvZFxuICAgICAgY29uc3QgY2FuUmVuZGVyID0gdXNlQ2FuUmVuZGVyKClcblxuICAgICAgbGV0IGN1ckRvY1ZpZXdcblxuICAgICAgZnVuY3Rpb24gY2xlYW51cCAoKSB7XG4gICAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJEb2NWaWV3ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAvLyBpT1MgaXMgZnV6enksIG5lZWQgdG8gY2hlY2sgaXQgZmlyc3RcbiAgICAgICAgICBpZiAoY3VyRG9jVmlldy5yZW1vdmVFdmVudExpc3RlbmVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGN1ckRvY1ZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdHJpZ2dlciwgbGlzdGVuT3B0cy5wYXNzaXZlKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJEb2NWaWV3ID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25PYmpMb2FkICgpIHtcbiAgICAgICAgY2xlYW51cCgpXG5cbiAgICAgICAgaWYgKHRhcmdldEVsICYmIHRhcmdldEVsLmNvbnRlbnREb2N1bWVudCkge1xuICAgICAgICAgIGN1ckRvY1ZpZXcgPSB0YXJnZXRFbC5jb250ZW50RG9jdW1lbnQuZGVmYXVsdFZpZXdcbiAgICAgICAgICBjdXJEb2NWaWV3LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRyaWdnZXIsIGxpc3Rlbk9wdHMucGFzc2l2ZSlcbiAgICAgICAgICBlbWl0RXZlbnQoKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICB0YXJnZXRFbCA9IHByb3h5LiRlbFxuICAgICAgICAgIHRhcmdldEVsICYmIG9uT2JqTG9hZCgpXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBvbkJlZm9yZVVubW91bnQoY2xlYW51cClcblxuICAgICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RcbiAgICAgIHByb3h5LnRyaWdnZXIgPSB0cmlnZ2VyXG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChjYW5SZW5kZXIudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gaCgnb2JqZWN0Jywge1xuICAgICAgICAgICAgc3R5bGU6IHJlc2l6ZVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgdGFiaW5kZXg6IC0xLCAvLyBmaXggZm9yIEZpcmVmb3hcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2h0bWwnLFxuICAgICAgICAgICAgZGF0YTogcmVzaXplUHJvcHMudXJsLFxuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICAgICAgb25Mb2FkOiBvbk9iakxvYWRcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgaW5qZWN0LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRUmVzaXplT2JzZXJ2ZXIgZnJvbSAnLi4vcmVzaXplLW9ic2VydmVyL1FSZXNpemVPYnNlcnZlci5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoVW5pcXVlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgbGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUhlYWRlcicsXG5cbiAgcHJvcHM6IHtcbiAgICBtb2RlbFZhbHVlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgcmV2ZWFsOiBCb29sZWFuLFxuICAgIHJldmVhbE9mZnNldDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMjUwXG4gICAgfSxcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBlbGV2YXRlZDogQm9vbGVhbixcblxuICAgIGhlaWdodEhpbnQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDUwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdyZXZlYWwnLCAnZm9jdXNpbicgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkbGF5b3V0ID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRSGVhZGVyIG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCBzaXplID0gcmVmKHBhcnNlSW50KHByb3BzLmhlaWdodEhpbnQsIDEwKSlcbiAgICBjb25zdCByZXZlYWxlZCA9IHJlZih0cnVlKVxuXG4gICAgY29uc3QgZml4ZWQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMucmV2ZWFsID09PSB0cnVlXG4gICAgICB8fCAkbGF5b3V0LnZpZXcudmFsdWUuaW5kZXhPZignSCcpID4gLTFcbiAgICAgIHx8ICgkcS5wbGF0Zm9ybS5pcy5pb3MgJiYgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZSlcbiAgICApXG5cbiAgICBjb25zdCBvZmZzZXQgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfVxuICAgICAgaWYgKGZpeGVkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiByZXZlYWxlZC52YWx1ZSA9PT0gdHJ1ZSA/IHNpemUudmFsdWUgOiAwXG4gICAgICB9XG4gICAgICBjb25zdCBvZmZzZXQgPSBzaXplLnZhbHVlIC0gJGxheW91dC5zY3JvbGwudmFsdWUucG9zaXRpb25cbiAgICAgIHJldHVybiBvZmZzZXQgPiAwID8gb2Zmc2V0IDogMFxuICAgIH0pXG5cbiAgICBjb25zdCBoaWRkZW4gPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlICE9PSB0cnVlXG4gICAgICB8fCAoZml4ZWQudmFsdWUgPT09IHRydWUgJiYgcmV2ZWFsZWQudmFsdWUgIT09IHRydWUpXG4gICAgKVxuXG4gICAgY29uc3QgcmV2ZWFsT25Gb2N1cyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIGhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5yZXZlYWwgPT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWhlYWRlciBxLWxheW91dF9fc2VjdGlvbi0tbWFyZ2luYWwgJ1xuICAgICAgKyAoZml4ZWQudmFsdWUgPT09IHRydWUgPyAnZml4ZWQnIDogJ2Fic29sdXRlJykgKyAnLXRvcCdcbiAgICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLWhlYWRlci0tYm9yZGVyZWQnIDogJycpXG4gICAgICArIChoaWRkZW4udmFsdWUgPT09IHRydWUgPyAnIHEtaGVhZGVyLS1oaWRkZW4nIDogJycpXG4gICAgICArIChwcm9wcy5tb2RlbFZhbHVlICE9PSB0cnVlID8gJyBxLWxheW91dC0tcHJldmVudC1mb2N1cycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0XG4gICAgICAgIHZpZXcgPSAkbGF5b3V0LnJvd3MudmFsdWUudG9wLFxuICAgICAgICBjc3MgPSB7fVxuXG4gICAgICBpZiAodmlld1sgMCBdID09PSAnbCcgJiYgJGxheW91dC5sZWZ0LnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzc1sgJHEubGFuZy5ydGwgPT09IHRydWUgPyAncmlnaHQnIDogJ2xlZnQnIF0gPSBgJHsgJGxheW91dC5sZWZ0LnNpemUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKHZpZXdbIDIgXSA9PT0gJ3InICYmICRsYXlvdXQucmlnaHQuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdsZWZ0JyA6ICdyaWdodCcgXSA9IGAkeyAkbGF5b3V0LnJpZ2h0LnNpemUgfXB4YFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3NzXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxheW91dCAocHJvcCwgdmFsKSB7XG4gICAgICAkbGF5b3V0LnVwZGF0ZSgnaGVhZGVyJywgcHJvcCwgdmFsKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsIChwcm9wLCB2YWwpIHtcbiAgICAgIGlmIChwcm9wLnZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgcHJvcC52YWx1ZSA9IHZhbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVzaXplICh7IGhlaWdodCB9KSB7XG4gICAgICB1cGRhdGVMb2NhbChzaXplLCBoZWlnaHQpXG4gICAgICB1cGRhdGVMYXlvdXQoJ3NpemUnLCBoZWlnaHQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c2luIChldnQpIHtcbiAgICAgIGlmIChyZXZlYWxPbkZvY3VzLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZUxvY2FsKHJldmVhbGVkLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdmb2N1c2luJywgZXZ0KVxuICAgIH1cblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsIHZhbCA9PiB7XG4gICAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgdmFsKVxuICAgICAgdXBkYXRlTG9jYWwocmV2ZWFsZWQsIHRydWUpXG4gICAgICAkbGF5b3V0LmFuaW1hdGUoKVxuICAgIH0pXG5cbiAgICB3YXRjaChvZmZzZXQsIHZhbCA9PiB7XG4gICAgICB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIHZhbClcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMucmV2ZWFsLCB2YWwgPT4ge1xuICAgICAgdmFsID09PSBmYWxzZSAmJiB1cGRhdGVMb2NhbChyZXZlYWxlZCwgcHJvcHMubW9kZWxWYWx1ZSlcbiAgICB9KVxuXG4gICAgd2F0Y2gocmV2ZWFsZWQsIHZhbCA9PiB7XG4gICAgICAkbGF5b3V0LmFuaW1hdGUoKVxuICAgICAgZW1pdCgncmV2ZWFsJywgdmFsKVxuICAgIH0pXG5cbiAgICB3YXRjaCgkbGF5b3V0LnNjcm9sbCwgc2Nyb2xsID0+IHtcbiAgICAgIHByb3BzLnJldmVhbCA9PT0gdHJ1ZSAmJiB1cGRhdGVMb2NhbChyZXZlYWxlZCxcbiAgICAgICAgc2Nyb2xsLmRpcmVjdGlvbiA9PT0gJ3VwJ1xuICAgICAgICB8fCBzY3JvbGwucG9zaXRpb24gPD0gcHJvcHMucmV2ZWFsT2Zmc2V0XG4gICAgICAgIHx8IHNjcm9sbC5wb3NpdGlvbiAtIHNjcm9sbC5pbmZsZWN0aW9uUG9pbnQgPCAxMDBcbiAgICAgIClcbiAgICB9KVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSB7fVxuXG4gICAgJGxheW91dC5pbnN0YW5jZXMuaGVhZGVyID0gaW5zdGFuY2VcbiAgICBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIHVwZGF0ZUxheW91dCgnc2l6ZScsIHNpemUudmFsdWUpXG4gICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIHByb3BzLm1vZGVsVmFsdWUpXG4gICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCBvZmZzZXQudmFsdWUpXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgaWYgKCRsYXlvdXQuaW5zdGFuY2VzLmhlYWRlciA9PT0gaW5zdGFuY2UpIHtcbiAgICAgICAgJGxheW91dC5pbnN0YW5jZXMuaGVhZGVyID0gdm9pZCAwXG4gICAgICAgIHVwZGF0ZUxheW91dCgnc2l6ZScsIDApXG4gICAgICAgIHVwZGF0ZUxheW91dCgnb2Zmc2V0JywgMClcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIGZhbHNlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBoVW5pcXVlU2xvdChzbG90cy5kZWZhdWx0LCBbXSlcblxuICAgICAgcHJvcHMuZWxldmF0ZWQgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1sYXlvdXRfX3NoYWRvdyBhYnNvbHV0ZS1mdWxsIG92ZXJmbG93LWhpZGRlbiBuby1wb2ludGVyLWV2ZW50cydcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHtcbiAgICAgICAgICBkZWJvdW5jZTogMCxcbiAgICAgICAgICBvblJlc2l6ZVxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnaGVhZGVyJywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgICBvbkZvY3VzaW5cbiAgICAgIH0sIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldFNjcm9sbFRhcmdldCwgZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbiwgZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgbGlzdGVuT3B0cywgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuXG5jb25zdCB7IHBhc3NpdmUgfSA9IGxpc3Rlbk9wdHNcbmNvbnN0IGF4aXNWYWx1ZXMgPSBbICdib3RoJywgJ2hvcml6b250YWwnLCAndmVydGljYWwnIF1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTY3JvbGxPYnNlcnZlcicsXG5cbiAgcHJvcHM6IHtcbiAgICBheGlzOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gYXhpc1ZhbHVlcy5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICd2ZXJ0aWNhbCdcbiAgICB9LFxuXG4gICAgZGVib3VuY2U6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIHNjcm9sbFRhcmdldDoge1xuICAgICAgZGVmYXVsdDogdm9pZCAwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdzY3JvbGwnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IGVtaXQgfSkge1xuICAgIGNvbnN0IHNjcm9sbCA9IHtcbiAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgbGVmdDogMFxuICAgICAgfSxcblxuICAgICAgZGlyZWN0aW9uOiAnZG93bicsXG4gICAgICBkaXJlY3Rpb25DaGFuZ2VkOiBmYWxzZSxcblxuICAgICAgZGVsdGE6IHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwXG4gICAgICB9LFxuXG4gICAgICBpbmZsZWN0aW9uUG9pbnQ6IHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGNsZWFyVGltZXIgPSBudWxsLCBsb2NhbFNjcm9sbFRhcmdldCwgcGFyZW50RWxcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLnNjcm9sbFRhcmdldCwgKCkgPT4ge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZW1pdEV2ZW50ICgpIHtcbiAgICAgIGNsZWFyVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lcigpXG5cbiAgICAgIGNvbnN0IHRvcCA9IE1hdGgubWF4KDAsIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24obG9jYWxTY3JvbGxUYXJnZXQpKVxuICAgICAgY29uc3QgbGVmdCA9IGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbihsb2NhbFNjcm9sbFRhcmdldClcblxuICAgICAgY29uc3QgZGVsdGEgPSB7XG4gICAgICAgIHRvcDogdG9wIC0gc2Nyb2xsLnBvc2l0aW9uLnRvcCxcbiAgICAgICAgbGVmdDogbGVmdCAtIHNjcm9sbC5wb3NpdGlvbi5sZWZ0XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgKHByb3BzLmF4aXMgPT09ICd2ZXJ0aWNhbCcgJiYgZGVsdGEudG9wID09PSAwKVxuICAgICAgICB8fCAocHJvcHMuYXhpcyA9PT0gJ2hvcml6b250YWwnICYmIGRlbHRhLmxlZnQgPT09IDApXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGN1ckRpciA9IE1hdGguYWJzKGRlbHRhLnRvcCkgPj0gTWF0aC5hYnMoZGVsdGEubGVmdClcbiAgICAgICAgPyAoZGVsdGEudG9wIDwgMCA/ICd1cCcgOiAnZG93bicpXG4gICAgICAgIDogKGRlbHRhLmxlZnQgPCAwID8gJ2xlZnQnIDogJ3JpZ2h0JylcblxuICAgICAgc2Nyb2xsLnBvc2l0aW9uID0geyB0b3AsIGxlZnQgfVxuICAgICAgc2Nyb2xsLmRpcmVjdGlvbkNoYW5nZWQgPSBzY3JvbGwuZGlyZWN0aW9uICE9PSBjdXJEaXJcbiAgICAgIHNjcm9sbC5kZWx0YSA9IGRlbHRhXG5cbiAgICAgIGlmIChzY3JvbGwuZGlyZWN0aW9uQ2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICBzY3JvbGwuZGlyZWN0aW9uID0gY3VyRGlyXG4gICAgICAgIHNjcm9sbC5pbmZsZWN0aW9uUG9pbnQgPSBzY3JvbGwucG9zaXRpb25cbiAgICAgIH1cblxuICAgICAgZW1pdCgnc2Nyb2xsJywgeyAuLi5zY3JvbGwgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgbG9jYWxTY3JvbGxUYXJnZXQgPSBnZXRTY3JvbGxUYXJnZXQocGFyZW50RWwsIHByb3BzLnNjcm9sbFRhcmdldClcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRyaWdnZXIsIHBhc3NpdmUpXG4gICAgICB0cmlnZ2VyKHRydWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5jb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdHJpZ2dlciwgcGFzc2l2ZSlcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQgPSB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmlnZ2VyIChpbW1lZGlhdGVseSkge1xuICAgICAgaWYgKGltbWVkaWF0ZWx5ID09PSB0cnVlIHx8IHByb3BzLmRlYm91bmNlID09PSAwIHx8IHByb3BzLmRlYm91bmNlID09PSAnMCcpIHtcbiAgICAgICAgZW1pdEV2ZW50KClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNsZWFyVGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgWyB0aW1lciwgZm4gXSA9IHByb3BzLmRlYm91bmNlXG4gICAgICAgICAgPyBbIHNldFRpbWVvdXQoZW1pdEV2ZW50LCBwcm9wcy5kZWJvdW5jZSksIGNsZWFyVGltZW91dCBdXG4gICAgICAgICAgOiBbIHJlcXVlc3RBbmltYXRpb25GcmFtZShlbWl0RXZlbnQpLCBjYW5jZWxBbmltYXRpb25GcmFtZSBdXG5cbiAgICAgICAgY2xlYXJUaW1lciA9ICgpID0+IHtcbiAgICAgICAgICBmbih0aW1lcilcbiAgICAgICAgICBjbGVhclRpbWVyID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIHdhdGNoKCgpID0+IHByb3h5LiRxLmxhbmcucnRsLCBlbWl0RXZlbnQpXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgcGFyZW50RWwgPSBwcm94eS4kZWwucGFyZW50Tm9kZVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGNsZWFyVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lcigpXG4gICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfSlcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIHRyaWdnZXIsXG4gICAgICBnZXRQb3NpdGlvbjogKCkgPT4gc2Nyb2xsXG4gICAgfSlcblxuICAgIHJldHVybiBub29wXG4gIH1cbn0pXG4iLCJjb25zdCBtb2RpZmllcnNBbGwgPSB7XG4gIGxlZnQ6IHRydWUsXG4gIHJpZ2h0OiB0cnVlLFxuICB1cDogdHJ1ZSxcbiAgZG93bjogdHJ1ZSxcbiAgaG9yaXpvbnRhbDogdHJ1ZSxcbiAgdmVydGljYWw6IHRydWVcbn1cblxuY29uc3QgZGlyZWN0aW9uTGlzdCA9IE9iamVjdC5rZXlzKG1vZGlmaWVyc0FsbClcblxubW9kaWZpZXJzQWxsLmFsbCA9IHRydWVcblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vZGlmaWVyRGlyZWN0aW9ucyAobW9kKSB7XG4gIGNvbnN0IGRpciA9IHt9XG5cbiAgZm9yIChjb25zdCBkaXJlY3Rpb24gb2YgZGlyZWN0aW9uTGlzdCkge1xuICAgIGlmIChtb2RbIGRpcmVjdGlvbiBdID09PSB0cnVlKSB7XG4gICAgICBkaXJbIGRpcmVjdGlvbiBdID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGlmIChPYmplY3Qua2V5cyhkaXIpLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBtb2RpZmllcnNBbGxcbiAgfVxuXG4gIGlmIChkaXIuaG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgIGRpci5sZWZ0ID0gZGlyLnJpZ2h0ID0gdHJ1ZVxuICB9XG4gIGVsc2UgaWYgKGRpci5sZWZ0ID09PSB0cnVlICYmIGRpci5yaWdodCA9PT0gdHJ1ZSkge1xuICAgIGRpci5ob3Jpem9udGFsID0gdHJ1ZVxuICB9XG5cbiAgaWYgKGRpci52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgIGRpci51cCA9IGRpci5kb3duID0gdHJ1ZVxuICB9XG4gIGVsc2UgaWYgKGRpci51cCA9PT0gdHJ1ZSAmJiBkaXIuZG93biA9PT0gdHJ1ZSkge1xuICAgIGRpci52ZXJ0aWNhbCA9IHRydWVcbiAgfVxuXG4gIGlmIChkaXIuaG9yaXpvbnRhbCA9PT0gdHJ1ZSAmJiBkaXIudmVydGljYWwgPT09IHRydWUpIHtcbiAgICBkaXIuYWxsID0gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIGRpclxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkU3RhcnQgKGV2dCwgY3R4KSB7XG4gIHJldHVybiBjdHguZXZlbnQgPT09IHZvaWQgMFxuICAgICYmIGV2dC50YXJnZXQgIT09IHZvaWQgMFxuICAgICYmIGV2dC50YXJnZXQuZHJhZ2dhYmxlICE9PSB0cnVlXG4gICAgJiYgdHlwZW9mIGN0eC5oYW5kbGVyID09PSAnZnVuY3Rpb24nXG4gICAgJiYgZXZ0LnRhcmdldC5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpICE9PSAnSU5QVVQnXG4gICAgJiYgKGV2dC5xQ2xvbmVkQnkgPT09IHZvaWQgMCB8fCBldnQucUNsb25lZEJ5LmluZGV4T2YoY3R4LnVpZCkgPT09IC0xKVxufVxuIiwiaW1wb3J0IFBsYXRmb3JtIGZyb20gJy4uLy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlbGVjdGlvbiAoKSB7XG4gIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uICE9PSB2b2lkIDApIHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICBpZiAoc2VsZWN0aW9uLmVtcHR5ICE9PSB2b2lkIDApIHtcbiAgICAgIHNlbGVjdGlvbi5lbXB0eSgpXG4gICAgfVxuICAgIGVsc2UgaWYgKHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMgIT09IHZvaWQgMCkge1xuICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgICBQbGF0Zm9ybS5pcy5tb2JpbGUgIT09IHRydWUgJiYgc2VsZWN0aW9uLmFkZFJhbmdlKGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkpXG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGRvY3VtZW50LnNlbGVjdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgZG9jdW1lbnQuc2VsZWN0aW9uLmVtcHR5KClcbiAgfVxufVxuIiwiaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcblxuaW1wb3J0IHsgY3JlYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBnZXRNb2RpZmllckRpcmVjdGlvbnMsIHNob3VsZFN0YXJ0IH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS90b3VjaC5qcydcbmltcG9ydCB7IGFkZEV2dCwgY2xlYW5FdnQsIHBvc2l0aW9uLCBsZWZ0Q2xpY2ssIHByZXZlbnQsIHN0b3AsIHN0b3BBbmRQcmV2ZW50LCBwcmV2ZW50RHJhZ2dhYmxlLCBub29wIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBjbGVhclNlbGVjdGlvbiB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvc2VsZWN0aW9uLmpzJ1xuaW1wb3J0IGdldFNTUlByb3BzIGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvbm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS5qcydcblxuZnVuY3Rpb24gZ2V0Q2hhbmdlcyAoZXZ0LCBjdHgsIGlzRmluYWwpIHtcbiAgY29uc3QgcG9zID0gcG9zaXRpb24oZXZ0KVxuICBsZXRcbiAgICBkaXIsXG4gICAgZGlzdFggPSBwb3MubGVmdCAtIGN0eC5ldmVudC54LFxuICAgIGRpc3RZID0gcG9zLnRvcCAtIGN0eC5ldmVudC55LFxuICAgIGFic1ggPSBNYXRoLmFicyhkaXN0WCksXG4gICAgYWJzWSA9IE1hdGguYWJzKGRpc3RZKVxuXG4gIGNvbnN0IGRpcmVjdGlvbiA9IGN0eC5kaXJlY3Rpb25cblxuICBpZiAoZGlyZWN0aW9uLmhvcml6b250YWwgPT09IHRydWUgJiYgZGlyZWN0aW9uLnZlcnRpY2FsICE9PSB0cnVlKSB7XG4gICAgZGlyID0gZGlzdFggPCAwID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICB9XG4gIGVsc2UgaWYgKGRpcmVjdGlvbi5ob3Jpem9udGFsICE9PSB0cnVlICYmIGRpcmVjdGlvbi52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgIGRpciA9IGRpc3RZIDwgMCA/ICd1cCcgOiAnZG93bidcbiAgfVxuICBlbHNlIGlmIChkaXJlY3Rpb24udXAgPT09IHRydWUgJiYgZGlzdFkgPCAwKSB7XG4gICAgZGlyID0gJ3VwJ1xuICAgIGlmIChhYnNYID4gYWJzWSkge1xuICAgICAgaWYgKGRpcmVjdGlvbi5sZWZ0ID09PSB0cnVlICYmIGRpc3RYIDwgMCkge1xuICAgICAgICBkaXIgPSAnbGVmdCdcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbi5yaWdodCA9PT0gdHJ1ZSAmJiBkaXN0WCA+IDApIHtcbiAgICAgICAgZGlyID0gJ3JpZ2h0J1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlIGlmIChkaXJlY3Rpb24uZG93biA9PT0gdHJ1ZSAmJiBkaXN0WSA+IDApIHtcbiAgICBkaXIgPSAnZG93bidcbiAgICBpZiAoYWJzWCA+IGFic1kpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24ubGVmdCA9PT0gdHJ1ZSAmJiBkaXN0WCA8IDApIHtcbiAgICAgICAgZGlyID0gJ2xlZnQnXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChkaXJlY3Rpb24ucmlnaHQgPT09IHRydWUgJiYgZGlzdFggPiAwKSB7XG4gICAgICAgIGRpciA9ICdyaWdodCdcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoZGlyZWN0aW9uLmxlZnQgPT09IHRydWUgJiYgZGlzdFggPCAwKSB7XG4gICAgZGlyID0gJ2xlZnQnXG4gICAgaWYgKGFic1ggPCBhYnNZKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uLnVwID09PSB0cnVlICYmIGRpc3RZIDwgMCkge1xuICAgICAgICBkaXIgPSAndXAnXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChkaXJlY3Rpb24uZG93biA9PT0gdHJ1ZSAmJiBkaXN0WSA+IDApIHtcbiAgICAgICAgZGlyID0gJ2Rvd24nXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGRpcmVjdGlvbi5yaWdodCA9PT0gdHJ1ZSAmJiBkaXN0WCA+IDApIHtcbiAgICBkaXIgPSAncmlnaHQnXG4gICAgaWYgKGFic1ggPCBhYnNZKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uLnVwID09PSB0cnVlICYmIGRpc3RZIDwgMCkge1xuICAgICAgICBkaXIgPSAndXAnXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChkaXJlY3Rpb24uZG93biA9PT0gdHJ1ZSAmJiBkaXN0WSA+IDApIHtcbiAgICAgICAgZGlyID0gJ2Rvd24nXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbGV0IHN5bnRoZXRpYyA9IGZhbHNlXG5cbiAgaWYgKGRpciA9PT0gdm9pZCAwICYmIGlzRmluYWwgPT09IGZhbHNlKSB7XG4gICAgaWYgKGN0eC5ldmVudC5pc0ZpcnN0ID09PSB0cnVlIHx8IGN0eC5ldmVudC5sYXN0RGlyID09PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiB7fVxuICAgIH1cblxuICAgIGRpciA9IGN0eC5ldmVudC5sYXN0RGlyXG4gICAgc3ludGhldGljID0gdHJ1ZVxuXG4gICAgaWYgKGRpciA9PT0gJ2xlZnQnIHx8IGRpciA9PT0gJ3JpZ2h0Jykge1xuICAgICAgcG9zLmxlZnQgLT0gZGlzdFhcbiAgICAgIGFic1ggPSAwXG4gICAgICBkaXN0WCA9IDBcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwb3MudG9wIC09IGRpc3RZXG4gICAgICBhYnNZID0gMFxuICAgICAgZGlzdFkgPSAwXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzeW50aGV0aWMsXG4gICAgcGF5bG9hZDoge1xuICAgICAgZXZ0LFxuICAgICAgdG91Y2g6IGN0eC5ldmVudC5tb3VzZSAhPT0gdHJ1ZSxcbiAgICAgIG1vdXNlOiBjdHguZXZlbnQubW91c2UgPT09IHRydWUsXG4gICAgICBwb3NpdGlvbjogcG9zLFxuICAgICAgZGlyZWN0aW9uOiBkaXIsXG4gICAgICBpc0ZpcnN0OiBjdHguZXZlbnQuaXNGaXJzdCxcbiAgICAgIGlzRmluYWw6IGlzRmluYWwgPT09IHRydWUsXG4gICAgICBkdXJhdGlvbjogRGF0ZS5ub3coKSAtIGN0eC5ldmVudC50aW1lLFxuICAgICAgZGlzdGFuY2U6IHtcbiAgICAgICAgeDogYWJzWCxcbiAgICAgICAgeTogYWJzWVxuICAgICAgfSxcbiAgICAgIG9mZnNldDoge1xuICAgICAgICB4OiBkaXN0WCxcbiAgICAgICAgeTogZGlzdFlcbiAgICAgIH0sXG4gICAgICBkZWx0YToge1xuICAgICAgICB4OiBwb3MubGVmdCAtIGN0eC5ldmVudC5sYXN0WCxcbiAgICAgICAgeTogcG9zLnRvcCAtIGN0eC5ldmVudC5sYXN0WVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5sZXQgdWlkID0gMFxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVEaXJlY3RpdmUoX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8geyBuYW1lOiAndG91Y2gtcGFuJywgZ2V0U1NSUHJvcHMgfVxuICA6IHtcbiAgICAgIG5hbWU6ICd0b3VjaC1wYW4nLFxuXG4gICAgICBiZWZvcmVNb3VudCAoZWwsIHsgdmFsdWUsIG1vZGlmaWVycyB9KSB7XG4gICAgICAgIC8vIGVhcmx5IHJldHVybiwgd2UgZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZ1xuICAgICAgICBpZiAobW9kaWZpZXJzLm1vdXNlICE9PSB0cnVlICYmIGNsaWVudC5oYXMudG91Y2ggIT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUV2ZW50IChldnQsIG1vdXNlRXZlbnQpIHtcbiAgICAgICAgICBpZiAobW9kaWZpZXJzLm1vdXNlID09PSB0cnVlICYmIG1vdXNlRXZlbnQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGV2dClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtb2RpZmllcnMuc3RvcCA9PT0gdHJ1ZSAmJiBzdG9wKGV2dClcbiAgICAgICAgICAgIG1vZGlmaWVycy5wcmV2ZW50ID09PSB0cnVlICYmIHByZXZlbnQoZXZ0KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgICAgICB1aWQ6ICdxdnRwXycgKyAodWlkKyspLFxuICAgICAgICAgIGhhbmRsZXI6IHZhbHVlLFxuICAgICAgICAgIG1vZGlmaWVycyxcbiAgICAgICAgICBkaXJlY3Rpb246IGdldE1vZGlmaWVyRGlyZWN0aW9ucyhtb2RpZmllcnMpLFxuXG4gICAgICAgICAgbm9vcCxcblxuICAgICAgICAgIG1vdXNlU3RhcnQgKGV2dCkge1xuICAgICAgICAgICAgaWYgKHNob3VsZFN0YXJ0KGV2dCwgY3R4KSAmJiBsZWZ0Q2xpY2soZXZ0KSkge1xuICAgICAgICAgICAgICBhZGRFdnQoY3R4LCAndGVtcCcsIFtcbiAgICAgICAgICAgICAgICBbIGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgJ21vdmUnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF0sXG4gICAgICAgICAgICAgICAgWyBkb2N1bWVudCwgJ21vdXNldXAnLCAnZW5kJywgJ3Bhc3NpdmVDYXB0dXJlJyBdXG4gICAgICAgICAgICAgIF0pXG5cbiAgICAgICAgICAgICAgY3R4LnN0YXJ0KGV2dCwgdHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgdG91Y2hTdGFydCAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RhcnQoZXZ0LCBjdHgpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXRcblxuICAgICAgICAgICAgICBhZGRFdnQoY3R4LCAndGVtcCcsIFtcbiAgICAgICAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNobW92ZScsICdtb3ZlJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdLFxuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hjYW5jZWwnLCAnZW5kJywgJ3Bhc3NpdmVDYXB0dXJlJyBdLFxuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hlbmQnLCAnZW5kJywgJ3Bhc3NpdmVDYXB0dXJlJyBdXG4gICAgICAgICAgICAgIF0pXG5cbiAgICAgICAgICAgICAgY3R4LnN0YXJ0KGV2dClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc3RhcnQgKGV2dCwgbW91c2VFdmVudCkge1xuICAgICAgICAgICAgY2xpZW50LmlzLmZpcmVmb3ggPT09IHRydWUgJiYgcHJldmVudERyYWdnYWJsZShlbCwgdHJ1ZSlcbiAgICAgICAgICAgIGN0eC5sYXN0RXZ0ID0gZXZ0XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAqIFN0b3AgcHJvcGFnYXRpb24gc28gcG9zc2libGUgdXBwZXIgdi10b3VjaC1wYW4gZG9uJ3QgY2F0Y2ggdGhpcyBhcyB3ZWxsO1xuICAgICAgICAgICAgKiBJZiB3ZSdyZSBub3QgdGhlIHRhcmdldCAoYmFzZWQgb24gbW9kaWZpZXJzKSwgd2UnbGwgcmUtZW1pdCB0aGUgZXZlbnQgbGF0ZXJcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAobW91c2VFdmVudCA9PT0gdHJ1ZSB8fCBtb2RpZmllcnMuc3RvcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAqIGFyZSB3ZSBkaXJlY3RseSBzd2l0Y2hpbmcgdG8gZGV0ZWN0ZWQgc3RhdGU/XG4gICAgICAgICAgICAgICogY2xvbmUgZXZlbnQgb25seSBvdGhlcndpc2VcbiAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24uYWxsICE9PSB0cnVlXG4gICAgICAgICAgICAgICAgLy8gYWNjb3VudCBmb3IgVU1EIHRvbyB3aGVyZSBtb2RpZmllcnMgd2lsbCBiZSBsb3dlcmNhc2VkIHRvIHdvcmtcbiAgICAgICAgICAgICAgICAmJiAobW91c2VFdmVudCAhPT0gdHJ1ZSB8fCAoY3R4Lm1vZGlmaWVycy5tb3VzZUFsbERpciAhPT0gdHJ1ZSAmJiBjdHgubW9kaWZpZXJzLm1vdXNlYWxsZGlyICE9PSB0cnVlKSlcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xvbmUgPSBldnQudHlwZS5pbmRleE9mKCdtb3VzZScpID4gLTFcbiAgICAgICAgICAgICAgICAgID8gbmV3IE1vdXNlRXZlbnQoZXZ0LnR5cGUsIGV2dClcbiAgICAgICAgICAgICAgICAgIDogbmV3IFRvdWNoRXZlbnQoZXZ0LnR5cGUsIGV2dClcblxuICAgICAgICAgICAgICAgIGV2dC5kZWZhdWx0UHJldmVudGVkID09PSB0cnVlICYmIHByZXZlbnQoY2xvbmUpXG4gICAgICAgICAgICAgICAgZXZ0LmNhbmNlbEJ1YmJsZSA9PT0gdHJ1ZSAmJiBzdG9wKGNsb25lKVxuXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjbG9uZSwge1xuICAgICAgICAgICAgICAgICAgcUtleUV2ZW50OiBldnQucUtleUV2ZW50LFxuICAgICAgICAgICAgICAgICAgcUNsaWNrT3V0c2lkZTogZXZ0LnFDbGlja091dHNpZGUsXG4gICAgICAgICAgICAgICAgICBxQW5jaG9ySGFuZGxlZDogZXZ0LnFBbmNob3JIYW5kbGVkLFxuICAgICAgICAgICAgICAgICAgcUNsb25lZEJ5OiBldnQucUNsb25lZEJ5ID09PSB2b2lkIDBcbiAgICAgICAgICAgICAgICAgICAgPyBbIGN0eC51aWQgXVxuICAgICAgICAgICAgICAgICAgICA6IGV2dC5xQ2xvbmVkQnkuY29uY2F0KGN0eC51aWQpXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGN0eC5pbml0aWFsRXZlbnQgPSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXQ6IGV2dC50YXJnZXQsXG4gICAgICAgICAgICAgICAgICBldmVudDogY2xvbmVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBzdG9wKGV2dClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IHBvc2l0aW9uKGV2dClcblxuICAgICAgICAgICAgY3R4LmV2ZW50ID0ge1xuICAgICAgICAgICAgICB4OiBsZWZ0LFxuICAgICAgICAgICAgICB5OiB0b3AsXG4gICAgICAgICAgICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgICAgICAgICAgIG1vdXNlOiBtb3VzZUV2ZW50ID09PSB0cnVlLFxuICAgICAgICAgICAgICBkZXRlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgIGlzRmlyc3Q6IHRydWUsXG4gICAgICAgICAgICAgIGlzRmluYWw6IGZhbHNlLFxuICAgICAgICAgICAgICBsYXN0WDogbGVmdCxcbiAgICAgICAgICAgICAgbGFzdFk6IHRvcFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBtb3ZlIChldnQpIHtcbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3RcbiAgICAgICAgICAgICAgcG9zID0gcG9zaXRpb24oZXZ0KSxcbiAgICAgICAgICAgICAgZGlzdFggPSBwb3MubGVmdCAtIGN0eC5ldmVudC54LFxuICAgICAgICAgICAgICBkaXN0WSA9IHBvcy50b3AgLSBjdHguZXZlbnQueVxuXG4gICAgICAgICAgICAvLyBwcmV2ZW50IGJ1Z2d5IGJyb3dzZXIgYmVoYXZpb3IgKGxpa2UgQmxpbmstYmFzZWQgZW5naW5lIG9uZXMgb24gV2luZG93cylcbiAgICAgICAgICAgIC8vIHdoZXJlIHRoZSBtb3VzZW1vdmUgZXZlbnQgb2NjdXJzIGV2ZW4gaWYgdGhlcmUncyBubyBtb3ZlbWVudCBhZnRlciBtb3VzZWRvd25cbiAgICAgICAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTE2MTQ2NFxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NzIxMzQxXG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vcXVhc2FyZnJhbWV3b3JrL3F1YXNhci9pc3N1ZXMvMTA3MjFcbiAgICAgICAgICAgIGlmIChkaXN0WCA9PT0gMCAmJiBkaXN0WSA9PT0gMCkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3R4Lmxhc3RFdnQgPSBldnRcblxuICAgICAgICAgICAgY29uc3QgaXNNb3VzZUV2dCA9IGN0eC5ldmVudC5tb3VzZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIGhhbmRsZUV2ZW50KGV2dCwgaXNNb3VzZUV2dClcblxuICAgICAgICAgICAgICBsZXQgY3Vyc29yXG4gICAgICAgICAgICAgIGlmIChtb2RpZmllcnMucHJlc2VydmVDdXJzb3IgIT09IHRydWUgJiYgbW9kaWZpZXJzLnByZXNlcnZlY3Vyc29yICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgY3Vyc29yID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciB8fCAnJ1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnZ3JhYmJpbmcnXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpc01vdXNlRXZ0ID09PSB0cnVlICYmIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbm8tcG9pbnRlci1ldmVudHMtLWNoaWxkcmVuJylcbiAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdub24tc2VsZWN0YWJsZScpXG4gICAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uKClcblxuICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwID0gd2l0aERlbGF5ZWRGbiA9PiB7XG4gICAgICAgICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cCA9IHZvaWQgMFxuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnNvciAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gY3Vyc29yXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdub24tc2VsZWN0YWJsZScpXG5cbiAgICAgICAgICAgICAgICBpZiAoaXNNb3VzZUV2dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXBvaW50ZXItZXZlbnRzLS1jaGlsZHJlbicpXG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmICh3aXRoRGVsYXllZEZuICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgICAgICAgICAgICB3aXRoRGVsYXllZEZuKClcbiAgICAgICAgICAgICAgICAgICAgfSwgNTApXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBlbHNlIHsgcmVtb3ZlKCkgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh3aXRoRGVsYXllZEZuICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgIHdpdGhEZWxheWVkRm4oKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50LmRldGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5pc0ZpcnN0ICE9PSB0cnVlICYmIGhhbmRsZUV2ZW50KGV2dCwgY3R4LmV2ZW50Lm1vdXNlKVxuXG4gICAgICAgICAgICAgIGNvbnN0IHsgcGF5bG9hZCwgc3ludGhldGljIH0gPSBnZXRDaGFuZ2VzKGV2dCwgY3R4LCBmYWxzZSlcblxuICAgICAgICAgICAgICBpZiAocGF5bG9hZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN0eC5oYW5kbGVyKHBheWxvYWQpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgY3R4LmVuZChldnQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaWYgKGN0eC5zdHlsZUNsZWFudXAgPT09IHZvaWQgMCAmJiBjdHguZXZlbnQuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFydCgpXG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGN0eC5ldmVudC5sYXN0WCA9IHBheWxvYWQucG9zaXRpb24ubGVmdFxuICAgICAgICAgICAgICAgICAgY3R4LmV2ZW50Lmxhc3RZID0gcGF5bG9hZC5wb3NpdGlvbi50b3BcbiAgICAgICAgICAgICAgICAgIGN0eC5ldmVudC5sYXN0RGlyID0gc3ludGhldGljID09PSB0cnVlID8gdm9pZCAwIDogcGF5bG9hZC5kaXJlY3Rpb25cbiAgICAgICAgICAgICAgICAgIGN0eC5ldmVudC5pc0ZpcnN0ID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLmFsbCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAvLyBhY2NvdW50IGZvciBVTUQgdG9vIHdoZXJlIG1vZGlmaWVycyB3aWxsIGJlIGxvd2VyY2FzZWQgdG8gd29ya1xuICAgICAgICAgICAgICB8fCAoaXNNb3VzZUV2dCA9PT0gdHJ1ZSAmJiAoY3R4Lm1vZGlmaWVycy5tb3VzZUFsbERpciA9PT0gdHJ1ZSB8fCBjdHgubW9kaWZpZXJzLm1vdXNlYWxsZGlyID09PSB0cnVlKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBzdGFydCgpXG4gICAgICAgICAgICAgIGN0eC5ldmVudC5kZXRlY3RlZCA9IHRydWVcbiAgICAgICAgICAgICAgY3R4Lm1vdmUoZXZ0KVxuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3RcbiAgICAgICAgICAgICAgYWJzWCA9IE1hdGguYWJzKGRpc3RYKSxcbiAgICAgICAgICAgICAgYWJzWSA9IE1hdGguYWJzKGRpc3RZKVxuXG4gICAgICAgICAgICBpZiAoYWJzWCAhPT0gYWJzWSkge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgKGN0eC5kaXJlY3Rpb24uaG9yaXpvbnRhbCA9PT0gdHJ1ZSAmJiBhYnNYID4gYWJzWSlcbiAgICAgICAgICAgICAgICB8fCAoY3R4LmRpcmVjdGlvbi52ZXJ0aWNhbCA9PT0gdHJ1ZSAmJiBhYnNYIDwgYWJzWSlcbiAgICAgICAgICAgICAgICB8fCAoY3R4LmRpcmVjdGlvbi51cCA9PT0gdHJ1ZSAmJiBhYnNYIDwgYWJzWSAmJiBkaXN0WSA8IDApXG4gICAgICAgICAgICAgICAgfHwgKGN0eC5kaXJlY3Rpb24uZG93biA9PT0gdHJ1ZSAmJiBhYnNYIDwgYWJzWSAmJiBkaXN0WSA+IDApXG4gICAgICAgICAgICAgICAgfHwgKGN0eC5kaXJlY3Rpb24ubGVmdCA9PT0gdHJ1ZSAmJiBhYnNYID4gYWJzWSAmJiBkaXN0WCA8IDApXG4gICAgICAgICAgICAgICAgfHwgKGN0eC5kaXJlY3Rpb24ucmlnaHQgPT09IHRydWUgJiYgYWJzWCA+IGFic1kgJiYgZGlzdFggPiAwKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjdHguZXZlbnQuZGV0ZWN0ZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgY3R4Lm1vdmUoZXZ0KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN0eC5lbmQoZXZ0LCB0cnVlKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVuZCAoZXZ0LCBhYm9ydCkge1xuICAgICAgICAgICAgaWYgKGN0eC5ldmVudCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbGVhbkV2dChjdHgsICd0ZW1wJylcbiAgICAgICAgICAgIGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlICYmIHByZXZlbnREcmFnZ2FibGUoZWwsIGZhbHNlKVxuXG4gICAgICAgICAgICBpZiAoYWJvcnQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cCAhPT0gdm9pZCAwICYmIGN0eC5zdHlsZUNsZWFudXAoKVxuXG4gICAgICAgICAgICAgIGlmIChjdHguZXZlbnQuZGV0ZWN0ZWQgIT09IHRydWUgJiYgY3R4LmluaXRpYWxFdmVudCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgY3R4LmluaXRpYWxFdmVudC50YXJnZXQuZGlzcGF0Y2hFdmVudChjdHguaW5pdGlhbEV2ZW50LmV2ZW50KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjdHguZXZlbnQuZGV0ZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmlzRmlyc3QgPT09IHRydWUgJiYgY3R4LmhhbmRsZXIoZ2V0Q2hhbmdlcyhldnQgPT09IHZvaWQgMCA/IGN0eC5sYXN0RXZ0IDogZXZ0LCBjdHgpLnBheWxvYWQpXG5cbiAgICAgICAgICAgICAgY29uc3QgeyBwYXlsb2FkIH0gPSBnZXRDaGFuZ2VzKGV2dCA9PT0gdm9pZCAwID8gY3R4Lmxhc3RFdnQgOiBldnQsIGN0eCwgdHJ1ZSlcbiAgICAgICAgICAgICAgY29uc3QgZm4gPSAoKSA9PiB7IGN0eC5oYW5kbGVyKHBheWxvYWQpIH1cblxuICAgICAgICAgICAgICBpZiAoY3R4LnN0eWxlQ2xlYW51cCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cChmbilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmbigpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3R4LmV2ZW50ID0gdm9pZCAwXG4gICAgICAgICAgICBjdHguaW5pdGlhbEV2ZW50ID0gdm9pZCAwXG4gICAgICAgICAgICBjdHgubGFzdEV2dCA9IHZvaWQgMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsLl9fcXRvdWNocGFuID0gY3R4XG5cbiAgICAgICAgaWYgKG1vZGlmaWVycy5tb3VzZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGFjY291bnQgZm9yIFVNRCB0b28gd2hlcmUgbW9kaWZpZXJzIHdpbGwgYmUgbG93ZXJjYXNlZCB0byB3b3JrXG4gICAgICAgICAgY29uc3QgY2FwdHVyZSA9IG1vZGlmaWVycy5tb3VzZUNhcHR1cmUgPT09IHRydWUgfHwgbW9kaWZpZXJzLm1vdXNlY2FwdHVyZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyAnQ2FwdHVyZSdcbiAgICAgICAgICAgIDogJydcblxuICAgICAgICAgIGFkZEV2dChjdHgsICdtYWluJywgW1xuICAgICAgICAgICAgWyBlbCwgJ21vdXNlZG93bicsICdtb3VzZVN0YXJ0JywgYHBhc3NpdmUkeyBjYXB0dXJlIH1gIF1cbiAgICAgICAgICBdKVxuICAgICAgICB9XG5cbiAgICAgICAgY2xpZW50Lmhhcy50b3VjaCA9PT0gdHJ1ZSAmJiBhZGRFdnQoY3R4LCAnbWFpbicsIFtcbiAgICAgICAgICBbIGVsLCAndG91Y2hzdGFydCcsICd0b3VjaFN0YXJ0JywgYHBhc3NpdmUkeyBtb2RpZmllcnMuY2FwdHVyZSA9PT0gdHJ1ZSA/ICdDYXB0dXJlJyA6ICcnIH1gIF0sXG4gICAgICAgICAgWyBlbCwgJ3RvdWNobW92ZScsICdub29wJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdIC8vIGNhbm5vdCBiZSBwYXNzaXZlIChleDogaU9TIHNjcm9sbClcbiAgICAgICAgXSlcbiAgICAgIH0sXG5cbiAgICAgIHVwZGF0ZWQgKGVsLCBiaW5kaW5ncykge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3F0b3VjaHBhblxuXG4gICAgICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgICAgIGlmIChiaW5kaW5ncy5vbGRWYWx1ZSAhPT0gYmluZGluZ3MudmFsdWUpIHtcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSAhPT0gJ2Z1bmN0aW9uJyAmJiBjdHguZW5kKClcbiAgICAgICAgICAgIGN0eC5oYW5kbGVyID0gYmluZGluZ3MudmFsdWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdHguZGlyZWN0aW9uID0gZ2V0TW9kaWZpZXJEaXJlY3Rpb25zKGJpbmRpbmdzLm1vZGlmaWVycylcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgYmVmb3JlVW5tb3VudCAoZWwpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gZWwuX19xdG91Y2hwYW5cblxuICAgICAgICBpZiAoY3R4ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAvLyBlbWl0IHRoZSBlbmQgZXZlbnQgd2hlbiB0aGUgZGlyZWN0aXZlIGlzIGRlc3Ryb3llZCB3aGlsZSBhY3RpdmVcbiAgICAgICAgICAvLyB0aGlzIGlzIG9ubHkgbmVlZGVkIGluIFRvdWNoUGFuIGJlY2F1c2UgdGhlIHJlc3Qgb2YgdGhlIHRvdWNoIGRpcmVjdGl2ZXMgZG8gbm90IGVtaXQgYW4gZW5kIGV2ZW50XG4gICAgICAgICAgLy8gdGhlIGNvbmRpdGlvbiBpcyBhbHNvIGNoZWNrZWQgaW4gdGhlIHN0YXJ0IG9mIGZ1bmN0aW9uIGJ1dCB3ZSBhdm9pZCB0aGUgY2FsbFxuICAgICAgICAgIGN0eC5ldmVudCAhPT0gdm9pZCAwICYmIGN0eC5lbmQoKVxuXG4gICAgICAgICAgY2xlYW5FdnQoY3R4LCAnbWFpbicpXG4gICAgICAgICAgY2xlYW5FdnQoY3R4LCAndGVtcCcpXG5cbiAgICAgICAgICBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZSAmJiBwcmV2ZW50RHJhZ2dhYmxlKGVsLCBmYWxzZSlcbiAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwICE9PSB2b2lkIDAgJiYgY3R4LnN0eWxlQ2xlYW51cCgpXG5cbiAgICAgICAgICBkZWxldGUgZWwuX19xdG91Y2hwYW5cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbilcbiIsImNvbnN0IHVuaXRzID0gWyAnQicsICdLQicsICdNQicsICdHQicsICdUQicsICdQQicgXVxuXG5leHBvcnQgZnVuY3Rpb24gaHVtYW5TdG9yYWdlU2l6ZSAoYnl0ZXMpIHtcbiAgbGV0IHUgPSAwXG5cbiAgd2hpbGUgKHBhcnNlSW50KGJ5dGVzLCAxMCkgPj0gMTAyNCAmJiB1IDwgdW5pdHMubGVuZ3RoIC0gMSkge1xuICAgIGJ5dGVzIC89IDEwMjRcbiAgICArK3VcbiAgfVxuXG4gIHJldHVybiBgJHsgYnl0ZXMudG9GaXhlZCgxKSB9JHsgdW5pdHNbIHUgXSB9YFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZSAoc3RyKSB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJldHdlZW4gKHYsIG1pbiwgbWF4KSB7XG4gIHJldHVybiBtYXggPD0gbWluXG4gICAgPyBtaW5cbiAgICA6IE1hdGgubWluKG1heCwgTWF0aC5tYXgobWluLCB2KSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVRvSW50ZXJ2YWwgKHYsIG1pbiwgbWF4KSB7XG4gIGlmIChtYXggPD0gbWluKSB7XG4gICAgcmV0dXJuIG1pblxuICB9XG5cbiAgY29uc3Qgc2l6ZSA9IChtYXggLSBtaW4gKyAxKVxuXG4gIGxldCBpbmRleCA9IG1pbiArICh2IC0gbWluKSAlIHNpemVcbiAgaWYgKGluZGV4IDwgbWluKSB7XG4gICAgaW5kZXggPSBzaXplICsgaW5kZXhcbiAgfVxuXG4gIHJldHVybiBpbmRleCA9PT0gMCA/IDAgOiBpbmRleCAvLyBmaXggZm9yICgtYSAlIGEpID0+IC0wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYWQgKHYsIGxlbmd0aCA9IDIsIGNoYXIgPSAnMCcpIHtcbiAgaWYgKHYgPT09IHZvaWQgMCB8fCB2ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHZcbiAgfVxuXG4gIGNvbnN0IHZhbCA9ICcnICsgdlxuICByZXR1cm4gdmFsLmxlbmd0aCA+PSBsZW5ndGhcbiAgICA/IHZhbFxuICAgIDogbmV3IEFycmF5KGxlbmd0aCAtIHZhbC5sZW5ndGggKyAxKS5qb2luKGNoYXIpICsgdmFsXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaHVtYW5TdG9yYWdlU2l6ZSxcbiAgY2FwaXRhbGl6ZSxcbiAgYmV0d2VlbixcbiAgbm9ybWFsaXplVG9JbnRlcnZhbCxcbiAgcGFkXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgd2l0aERpcmVjdGl2ZXMsIG9uQWN0aXZhdGVkLCBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcblxuaW1wb3J0IFFSZXNpemVPYnNlcnZlciBmcm9tICcuLi9yZXNpemUtb2JzZXJ2ZXIvUVJlc2l6ZU9ic2VydmVyLmpzJ1xuaW1wb3J0IFFTY3JvbGxPYnNlcnZlciBmcm9tICcuLi9zY3JvbGwtb2JzZXJ2ZXIvUVNjcm9sbE9ic2VydmVyLmpzJ1xuXG5pbXBvcnQgVG91Y2hQYW4gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9Ub3VjaFBhbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBiZXR3ZWVuIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgc2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbiwgc2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uLy4uL3V0aWxzL2RlYm91bmNlLmpzJ1xuXG5jb25zdCBheGlzTGlzdCA9IFsgJ3ZlcnRpY2FsJywgJ2hvcml6b250YWwnIF1cbmNvbnN0IGRpclByb3BzID0ge1xuICB2ZXJ0aWNhbDogeyBvZmZzZXQ6ICdvZmZzZXRZJywgc2Nyb2xsOiAnc2Nyb2xsVG9wJywgZGlyOiAnZG93bicsIGRpc3Q6ICd5JyB9LFxuICBob3Jpem9udGFsOiB7IG9mZnNldDogJ29mZnNldFgnLCBzY3JvbGw6ICdzY3JvbGxMZWZ0JywgZGlyOiAncmlnaHQnLCBkaXN0OiAneCcgfVxufVxuY29uc3QgcGFuT3B0cyA9IHtcbiAgcHJldmVudDogdHJ1ZSxcbiAgbW91c2U6IHRydWUsXG4gIG1vdXNlQWxsRGlyOiB0cnVlXG59XG5cbmNvbnN0IGdldE1pblRodW1iU2l6ZSA9IHNpemUgPT4gKHNpemUgPj0gMjUwID8gNTAgOiBNYXRoLmNlaWwoc2l6ZSAvIDUpKVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNjcm9sbEFyZWEnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgdGh1bWJTdHlsZTogT2JqZWN0LFxuICAgIHZlcnRpY2FsVGh1bWJTdHlsZTogT2JqZWN0LFxuICAgIGhvcml6b250YWxUaHVtYlN0eWxlOiBPYmplY3QsXG5cbiAgICBiYXJTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICB2ZXJ0aWNhbEJhclN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGhvcml6b250YWxCYXJTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcblxuICAgIGNvbnRlbnRTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBjb250ZW50QWN0aXZlU3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG5cbiAgICBkZWxheToge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogMTAwMFxuICAgIH0sXG5cbiAgICB2aXNpYmxlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG5cbiAgICB0YWJpbmRleDogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgb25TY3JvbGw6IEZ1bmN0aW9uXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICAvLyBzdGF0ZSBtYW5hZ2VtZW50XG4gICAgY29uc3QgdGVtcFNob3dpbmcgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgcGFubmluZyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBob3ZlciA9IHJlZihmYWxzZSlcblxuICAgIC8vIG90aGVyLi4uXG4gICAgY29uc3QgY29udGFpbmVyID0ge1xuICAgICAgdmVydGljYWw6IHJlZigwKSxcbiAgICAgIGhvcml6b250YWw6IHJlZigwKVxuICAgIH1cblxuICAgIGNvbnN0IHNjcm9sbCA9IHtcbiAgICAgIHZlcnRpY2FsOiB7XG4gICAgICAgIHJlZjogcmVmKG51bGwpLFxuICAgICAgICBwb3NpdGlvbjogcmVmKDApLFxuICAgICAgICBzaXplOiByZWYoMClcbiAgICAgIH0sXG5cbiAgICAgIGhvcml6b250YWw6IHtcbiAgICAgICAgcmVmOiByZWYobnVsbCksXG4gICAgICAgIHBvc2l0aW9uOiByZWYoMCksXG4gICAgICAgIHNpemU6IHJlZigwKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCBwcm94eS4kcSlcblxuICAgIGxldCB0aW1lciA9IG51bGwsIHBhblJlZlBvc1xuXG4gICAgY29uc3QgdGFyZ2V0UmVmID0gcmVmKG51bGwpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXNjcm9sbGFyZWEnXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtc2Nyb2xsYXJlYS0tZGFyaycgOiAnJylcbiAgICApXG5cbiAgICBzY3JvbGwudmVydGljYWwucGVyY2VudGFnZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGRpZmYgPSBzY3JvbGwudmVydGljYWwuc2l6ZS52YWx1ZSAtIGNvbnRhaW5lci52ZXJ0aWNhbC52YWx1ZVxuICAgICAgaWYgKGRpZmYgPD0gMCkgeyByZXR1cm4gMCB9XG4gICAgICBjb25zdCBwID0gYmV0d2VlbihzY3JvbGwudmVydGljYWwucG9zaXRpb24udmFsdWUgLyBkaWZmLCAwLCAxKVxuICAgICAgcmV0dXJuIE1hdGgucm91bmQocCAqIDEwMDAwKSAvIDEwMDAwXG4gICAgfSlcbiAgICBzY3JvbGwudmVydGljYWwudGh1bWJIaWRkZW4gPSBjb21wdXRlZCgoKSA9PlxuICAgICAgKFxuICAgICAgICAocHJvcHMudmlzaWJsZSA9PT0gbnVsbCA/IGhvdmVyLnZhbHVlIDogcHJvcHMudmlzaWJsZSkgIT09IHRydWVcbiAgICAgICAgJiYgdGVtcFNob3dpbmcudmFsdWUgPT09IGZhbHNlXG4gICAgICAgICYmIHBhbm5pbmcudmFsdWUgPT09IGZhbHNlXG4gICAgICApIHx8IHNjcm9sbC52ZXJ0aWNhbC5zaXplLnZhbHVlIDw9IGNvbnRhaW5lci52ZXJ0aWNhbC52YWx1ZSArIDFcbiAgICApXG4gICAgc2Nyb2xsLnZlcnRpY2FsLnRodW1iU3RhcnQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgc2Nyb2xsLnZlcnRpY2FsLnBlcmNlbnRhZ2UudmFsdWUgKiAoY29udGFpbmVyLnZlcnRpY2FsLnZhbHVlIC0gc2Nyb2xsLnZlcnRpY2FsLnRodW1iU2l6ZS52YWx1ZSlcbiAgICApXG4gICAgc2Nyb2xsLnZlcnRpY2FsLnRodW1iU2l6ZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBNYXRoLnJvdW5kKFxuICAgICAgICBiZXR3ZWVuKFxuICAgICAgICAgIGNvbnRhaW5lci52ZXJ0aWNhbC52YWx1ZSAqIGNvbnRhaW5lci52ZXJ0aWNhbC52YWx1ZSAvIHNjcm9sbC52ZXJ0aWNhbC5zaXplLnZhbHVlLFxuICAgICAgICAgIGdldE1pblRodW1iU2l6ZShjb250YWluZXIudmVydGljYWwudmFsdWUpLFxuICAgICAgICAgIGNvbnRhaW5lci52ZXJ0aWNhbC52YWx1ZVxuICAgICAgICApXG4gICAgICApXG4gICAgKVxuICAgIHNjcm9sbC52ZXJ0aWNhbC5zdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnByb3BzLnRodW1iU3R5bGUsXG4gICAgICAgIC4uLnByb3BzLnZlcnRpY2FsVGh1bWJTdHlsZSxcbiAgICAgICAgdG9wOiBgJHsgc2Nyb2xsLnZlcnRpY2FsLnRodW1iU3RhcnQudmFsdWUgfXB4YCxcbiAgICAgICAgaGVpZ2h0OiBgJHsgc2Nyb2xsLnZlcnRpY2FsLnRodW1iU2l6ZS52YWx1ZSB9cHhgXG4gICAgICB9XG4gICAgfSlcbiAgICBzY3JvbGwudmVydGljYWwudGh1bWJDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1zY3JvbGxhcmVhX190aHVtYiBxLXNjcm9sbGFyZWFfX3RodW1iLS12IGFic29sdXRlLXJpZ2h0J1xuICAgICAgKyAoc2Nyb2xsLnZlcnRpY2FsLnRodW1iSGlkZGVuLnZhbHVlID09PSB0cnVlID8gJyBxLXNjcm9sbGFyZWFfX3RodW1iLS1pbnZpc2libGUnIDogJycpXG4gICAgKVxuICAgIHNjcm9sbC52ZXJ0aWNhbC5iYXJDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1zY3JvbGxhcmVhX19iYXIgcS1zY3JvbGxhcmVhX19iYXItLXYgYWJzb2x1dGUtcmlnaHQnXG4gICAgICArIChzY3JvbGwudmVydGljYWwudGh1bWJIaWRkZW4udmFsdWUgPT09IHRydWUgPyAnIHEtc2Nyb2xsYXJlYV9fYmFyLS1pbnZpc2libGUnIDogJycpXG4gICAgKVxuXG4gICAgc2Nyb2xsLmhvcml6b250YWwucGVyY2VudGFnZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGRpZmYgPSBzY3JvbGwuaG9yaXpvbnRhbC5zaXplLnZhbHVlIC0gY29udGFpbmVyLmhvcml6b250YWwudmFsdWVcbiAgICAgIGlmIChkaWZmIDw9IDApIHsgcmV0dXJuIDAgfVxuICAgICAgY29uc3QgcCA9IGJldHdlZW4oTWF0aC5hYnMoc2Nyb2xsLmhvcml6b250YWwucG9zaXRpb24udmFsdWUpIC8gZGlmZiwgMCwgMSlcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKHAgKiAxMDAwMCkgLyAxMDAwMFxuICAgIH0pXG4gICAgc2Nyb2xsLmhvcml6b250YWwudGh1bWJIaWRkZW4gPSBjb21wdXRlZCgoKSA9PlxuICAgICAgKFxuICAgICAgICAocHJvcHMudmlzaWJsZSA9PT0gbnVsbCA/IGhvdmVyLnZhbHVlIDogcHJvcHMudmlzaWJsZSkgIT09IHRydWVcbiAgICAgICAgJiYgdGVtcFNob3dpbmcudmFsdWUgPT09IGZhbHNlXG4gICAgICAgICYmIHBhbm5pbmcudmFsdWUgPT09IGZhbHNlXG4gICAgICApIHx8IHNjcm9sbC5ob3Jpem9udGFsLnNpemUudmFsdWUgPD0gY29udGFpbmVyLmhvcml6b250YWwudmFsdWUgKyAxXG4gICAgKVxuICAgIHNjcm9sbC5ob3Jpem9udGFsLnRodW1iU3RhcnQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgc2Nyb2xsLmhvcml6b250YWwucGVyY2VudGFnZS52YWx1ZSAqIChjb250YWluZXIuaG9yaXpvbnRhbC52YWx1ZSAtIHNjcm9sbC5ob3Jpem9udGFsLnRodW1iU2l6ZS52YWx1ZSlcbiAgICApXG4gICAgc2Nyb2xsLmhvcml6b250YWwudGh1bWJTaXplID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIE1hdGgucm91bmQoXG4gICAgICAgIGJldHdlZW4oXG4gICAgICAgICAgY29udGFpbmVyLmhvcml6b250YWwudmFsdWUgKiBjb250YWluZXIuaG9yaXpvbnRhbC52YWx1ZSAvIHNjcm9sbC5ob3Jpem9udGFsLnNpemUudmFsdWUsXG4gICAgICAgICAgZ2V0TWluVGh1bWJTaXplKGNvbnRhaW5lci5ob3Jpem9udGFsLnZhbHVlKSxcbiAgICAgICAgICBjb250YWluZXIuaG9yaXpvbnRhbC52YWx1ZVxuICAgICAgICApXG4gICAgICApXG4gICAgKVxuICAgIHNjcm9sbC5ob3Jpem9udGFsLnN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucHJvcHMudGh1bWJTdHlsZSxcbiAgICAgICAgLi4ucHJvcHMuaG9yaXpvbnRhbFRodW1iU3R5bGUsXG4gICAgICAgIFsgcHJveHkuJHEubGFuZy5ydGwgPT09IHRydWUgPyAncmlnaHQnIDogJ2xlZnQnIF06IGAkeyBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYlN0YXJ0LnZhbHVlIH1weGAsXG4gICAgICAgIHdpZHRoOiBgJHsgc2Nyb2xsLmhvcml6b250YWwudGh1bWJTaXplLnZhbHVlIH1weGBcbiAgICAgIH1cbiAgICB9KVxuICAgIHNjcm9sbC5ob3Jpem9udGFsLnRodW1iQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3Etc2Nyb2xsYXJlYV9fdGh1bWIgcS1zY3JvbGxhcmVhX190aHVtYi0taCBhYnNvbHV0ZS1ib3R0b20nXG4gICAgICArIChzY3JvbGwuaG9yaXpvbnRhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zY3JvbGxhcmVhX190aHVtYi0taW52aXNpYmxlJyA6ICcnKVxuICAgIClcbiAgICBzY3JvbGwuaG9yaXpvbnRhbC5iYXJDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1zY3JvbGxhcmVhX19iYXIgcS1zY3JvbGxhcmVhX19iYXItLWggYWJzb2x1dGUtYm90dG9tJ1xuICAgICAgKyAoc2Nyb2xsLmhvcml6b250YWwudGh1bWJIaWRkZW4udmFsdWUgPT09IHRydWUgPyAnIHEtc2Nyb2xsYXJlYV9fYmFyLS1pbnZpc2libGUnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgbWFpblN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgc2Nyb2xsLnZlcnRpY2FsLnRodW1iSGlkZGVuLnZhbHVlID09PSB0cnVlICYmIHNjcm9sbC5ob3Jpem9udGFsLnRodW1iSGlkZGVuLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuY29udGVudFN0eWxlXG4gICAgICAgIDogcHJvcHMuY29udGVudEFjdGl2ZVN0eWxlXG4gICAgKSlcblxuICAgIGNvbnN0IHRodW1iVmVydERpciA9IFsgW1xuICAgICAgVG91Y2hQYW4sXG4gICAgICBlID0+IHsgb25QYW5UaHVtYihlLCAndmVydGljYWwnKSB9LFxuICAgICAgdm9pZCAwLFxuICAgICAgeyB2ZXJ0aWNhbDogdHJ1ZSwgLi4ucGFuT3B0cyB9XG4gICAgXSBdXG5cbiAgICBjb25zdCB0aHVtYkhvcml6RGlyID0gWyBbXG4gICAgICBUb3VjaFBhbixcbiAgICAgIGUgPT4geyBvblBhblRodW1iKGUsICdob3Jpem9udGFsJykgfSxcbiAgICAgIHZvaWQgMCxcbiAgICAgIHsgaG9yaXpvbnRhbDogdHJ1ZSwgLi4ucGFuT3B0cyB9XG4gICAgXSBdXG5cbiAgICBmdW5jdGlvbiBnZXRTY3JvbGwgKCkge1xuICAgICAgY29uc3QgaW5mbyA9IHt9XG5cbiAgICAgIGF4aXNMaXN0LmZvckVhY2goYXhpcyA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBzY3JvbGxbIGF4aXMgXVxuXG4gICAgICAgIGluZm9bIGF4aXMgKyAnUG9zaXRpb24nIF0gPSBkYXRhLnBvc2l0aW9uLnZhbHVlXG4gICAgICAgIGluZm9bIGF4aXMgKyAnUGVyY2VudGFnZScgXSA9IGRhdGEucGVyY2VudGFnZS52YWx1ZVxuICAgICAgICBpbmZvWyBheGlzICsgJ1NpemUnIF0gPSBkYXRhLnNpemUudmFsdWVcbiAgICAgICAgaW5mb1sgYXhpcyArICdDb250YWluZXJTaXplJyBdID0gY29udGFpbmVyWyBheGlzIF0udmFsdWVcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBpbmZvXG4gICAgfVxuXG4gICAgLy8gd2UgaGF2ZSBsb3RzIG9mIGxpc3RlbmVycywgc29cbiAgICAvLyBlbnN1cmUgd2UncmUgbm90IGVtaXR0aW5nIHNhbWUgaW5mb1xuICAgIC8vIG11bHRpcGxlIHRpbWVzXG4gICAgY29uc3QgZW1pdFNjcm9sbCA9IGRlYm91bmNlKCgpID0+IHtcbiAgICAgIGNvbnN0IGluZm8gPSBnZXRTY3JvbGwoKVxuICAgICAgaW5mby5yZWYgPSBwcm94eVxuICAgICAgZW1pdCgnc2Nyb2xsJywgaW5mbylcbiAgICB9LCAwKVxuXG4gICAgZnVuY3Rpb24gbG9jYWxTZXRTY3JvbGxQb3NpdGlvbiAoYXhpcywgb2Zmc2V0LCBkdXJhdGlvbikge1xuICAgICAgaWYgKGF4aXNMaXN0LmluY2x1ZGVzKGF4aXMpID09PSBmYWxzZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbUVNjcm9sbEFyZWFdOiB3cm9uZyBmaXJzdCBwYXJhbSBvZiBzZXRTY3JvbGxQb3NpdGlvbiAodmVydGljYWwvaG9yaXpvbnRhbCknKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgZm4gPSBheGlzID09PSAndmVydGljYWwnXG4gICAgICAgID8gc2V0VmVydGljYWxTY3JvbGxQb3NpdGlvblxuICAgICAgICA6IHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvblxuXG4gICAgICBmbih0YXJnZXRSZWYudmFsdWUsIG9mZnNldCwgZHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ29udGFpbmVyICh7IGhlaWdodCwgd2lkdGggfSkge1xuICAgICAgbGV0IGNoYW5nZSA9IGZhbHNlXG5cbiAgICAgIGlmIChjb250YWluZXIudmVydGljYWwudmFsdWUgIT09IGhlaWdodCkge1xuICAgICAgICBjb250YWluZXIudmVydGljYWwudmFsdWUgPSBoZWlnaHRcbiAgICAgICAgY2hhbmdlID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoY29udGFpbmVyLmhvcml6b250YWwudmFsdWUgIT09IHdpZHRoKSB7XG4gICAgICAgIGNvbnRhaW5lci5ob3Jpem9udGFsLnZhbHVlID0gd2lkdGhcbiAgICAgICAgY2hhbmdlID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjaGFuZ2UgPT09IHRydWUgJiYgc3RhcnRUaW1lcigpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2Nyb2xsICh7IHBvc2l0aW9uIH0pIHtcbiAgICAgIGxldCBjaGFuZ2UgPSBmYWxzZVxuXG4gICAgICBpZiAoc2Nyb2xsLnZlcnRpY2FsLnBvc2l0aW9uLnZhbHVlICE9PSBwb3NpdGlvbi50b3ApIHtcbiAgICAgICAgc2Nyb2xsLnZlcnRpY2FsLnBvc2l0aW9uLnZhbHVlID0gcG9zaXRpb24udG9wXG4gICAgICAgIGNoYW5nZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbC5ob3Jpem9udGFsLnBvc2l0aW9uLnZhbHVlICE9PSBwb3NpdGlvbi5sZWZ0KSB7XG4gICAgICAgIHNjcm9sbC5ob3Jpem9udGFsLnBvc2l0aW9uLnZhbHVlID0gcG9zaXRpb24ubGVmdFxuICAgICAgICBjaGFuZ2UgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGNoYW5nZSA9PT0gdHJ1ZSAmJiBzdGFydFRpbWVyKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVTY3JvbGxTaXplICh7IGhlaWdodCwgd2lkdGggfSkge1xuICAgICAgaWYgKHNjcm9sbC5ob3Jpem9udGFsLnNpemUudmFsdWUgIT09IHdpZHRoKSB7XG4gICAgICAgIHNjcm9sbC5ob3Jpem9udGFsLnNpemUudmFsdWUgPSB3aWR0aFxuICAgICAgICBzdGFydFRpbWVyKClcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbC52ZXJ0aWNhbC5zaXplLnZhbHVlICE9PSBoZWlnaHQpIHtcbiAgICAgICAgc2Nyb2xsLnZlcnRpY2FsLnNpemUudmFsdWUgPSBoZWlnaHRcbiAgICAgICAgc3RhcnRUaW1lcigpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QYW5UaHVtYiAoZSwgYXhpcykge1xuICAgICAgY29uc3QgZGF0YSA9IHNjcm9sbFsgYXhpcyBdXG5cbiAgICAgIGlmIChlLmlzRmlyc3QgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGRhdGEudGh1bWJIaWRkZW4udmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHBhblJlZlBvcyA9IGRhdGEucG9zaXRpb24udmFsdWVcbiAgICAgICAgcGFubmluZy52YWx1ZSA9IHRydWVcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHBhbm5pbmcudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChlLmlzRmluYWwgPT09IHRydWUpIHtcbiAgICAgICAgcGFubmluZy52YWx1ZSA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRQcm9wID0gZGlyUHJvcHNbIGF4aXMgXVxuICAgICAgY29uc3QgY29udGFpbmVyU2l6ZSA9IGNvbnRhaW5lclsgYXhpcyBdLnZhbHVlXG5cbiAgICAgIGNvbnN0IG11bHRpcGxpZXIgPSAoZGF0YS5zaXplLnZhbHVlIC0gY29udGFpbmVyU2l6ZSkgLyAoY29udGFpbmVyU2l6ZSAtIGRhdGEudGh1bWJTaXplLnZhbHVlKVxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBlLmRpc3RhbmNlWyBkUHJvcC5kaXN0IF1cbiAgICAgIGNvbnN0IHBvcyA9IHBhblJlZlBvcyArIChlLmRpcmVjdGlvbiA9PT0gZFByb3AuZGlyID8gMSA6IC0xKSAqIGRpc3RhbmNlICogbXVsdGlwbGllclxuXG4gICAgICBzZXRTY3JvbGwocG9zLCBheGlzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2Vkb3duIChldnQsIGF4aXMpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBzY3JvbGxbIGF4aXMgXVxuXG4gICAgICBpZiAoZGF0YS50aHVtYkhpZGRlbi52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBvZmZzZXQgPSBldnRbIGRpclByb3BzWyBheGlzIF0ub2Zmc2V0IF1cbiAgICAgICAgaWYgKG9mZnNldCA8IGRhdGEudGh1bWJTdGFydC52YWx1ZSB8fCBvZmZzZXQgPiBkYXRhLnRodW1iU3RhcnQudmFsdWUgKyBkYXRhLnRodW1iU2l6ZS52YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IHBvcyA9IG9mZnNldCAtIGRhdGEudGh1bWJTaXplLnZhbHVlIC8gMlxuICAgICAgICAgIHNldFNjcm9sbChwb3MgLyBjb250YWluZXJbIGF4aXMgXS52YWx1ZSAqIGRhdGEuc2l6ZS52YWx1ZSwgYXhpcylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFjdGl2YXRlIHRodW1iIHBhblxuICAgICAgICBpZiAoZGF0YS5yZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBkYXRhLnJlZi52YWx1ZS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KGV2dC50eXBlLCBldnQpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25WZXJ0aWNhbE1vdXNlZG93biAoZXZ0KSB7XG4gICAgICBvbk1vdXNlZG93bihldnQsICd2ZXJ0aWNhbCcpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Ib3Jpem9udGFsTW91c2Vkb3duIChldnQpIHtcbiAgICAgIG9uTW91c2Vkb3duKGV2dCwgJ2hvcml6b250YWwnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0VGltZXIgKCkge1xuICAgICAgdGVtcFNob3dpbmcudmFsdWUgPSB0cnVlXG5cbiAgICAgIHRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICB0ZW1wU2hvd2luZy52YWx1ZSA9IGZhbHNlXG4gICAgICB9LCBwcm9wcy5kZWxheSlcblxuICAgICAgcHJvcHMub25TY3JvbGwgIT09IHZvaWQgMCAmJiBlbWl0U2Nyb2xsKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRTY3JvbGwgKG9mZnNldCwgYXhpcykge1xuICAgICAgdGFyZ2V0UmVmLnZhbHVlWyBkaXJQcm9wc1sgYXhpcyBdLnNjcm9sbCBdID0gb2Zmc2V0XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZWVudGVyICgpIHtcbiAgICAgIGhvdmVyLnZhbHVlID0gdHJ1ZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VsZWF2ZSAoKSB7XG4gICAgICBob3Zlci52YWx1ZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gbnVsbFxuXG4gICAgd2F0Y2goKCkgPT4gcHJveHkuJHEubGFuZy5ydGwsIHJ0bCA9PiB7XG4gICAgICBpZiAodGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbihcbiAgICAgICAgICB0YXJnZXRSZWYudmFsdWUsXG4gICAgICAgICAgTWF0aC5hYnMoc2Nyb2xsLmhvcml6b250YWwucG9zaXRpb24udmFsdWUpICogKHJ0bCA9PT0gdHJ1ZSA/IC0xIDogMSlcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIHNjcm9sbFBvc2l0aW9uID0ge1xuICAgICAgICB0b3A6IHNjcm9sbC52ZXJ0aWNhbC5wb3NpdGlvbi52YWx1ZSxcbiAgICAgICAgbGVmdDogc2Nyb2xsLmhvcml6b250YWwucG9zaXRpb24udmFsdWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb25BY3RpdmF0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID09PSBudWxsKSB7IHJldHVybiB9XG5cbiAgICAgIGNvbnN0IHNjcm9sbFRhcmdldCA9IHRhcmdldFJlZi52YWx1ZVxuXG4gICAgICBpZiAoc2Nyb2xsVGFyZ2V0ICE9PSBudWxsKSB7XG4gICAgICAgIHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbihzY3JvbGxUYXJnZXQsIHNjcm9sbFBvc2l0aW9uLmxlZnQpXG4gICAgICAgIHNldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24oc2Nyb2xsVGFyZ2V0LCBzY3JvbGxQb3NpdGlvbi50b3ApXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudChlbWl0U2Nyb2xsLmNhbmNlbClcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIGdldFNjcm9sbFRhcmdldDogKCkgPT4gdGFyZ2V0UmVmLnZhbHVlLFxuICAgICAgZ2V0U2Nyb2xsLFxuICAgICAgZ2V0U2Nyb2xsUG9zaXRpb246ICgpID0+ICh7XG4gICAgICAgIHRvcDogc2Nyb2xsLnZlcnRpY2FsLnBvc2l0aW9uLnZhbHVlLFxuICAgICAgICBsZWZ0OiBzY3JvbGwuaG9yaXpvbnRhbC5wb3NpdGlvbi52YWx1ZVxuICAgICAgfSksXG4gICAgICBnZXRTY3JvbGxQZXJjZW50YWdlOiAoKSA9PiAoe1xuICAgICAgICB0b3A6IHNjcm9sbC52ZXJ0aWNhbC5wZXJjZW50YWdlLnZhbHVlLFxuICAgICAgICBsZWZ0OiBzY3JvbGwuaG9yaXpvbnRhbC5wZXJjZW50YWdlLnZhbHVlXG4gICAgICB9KSxcbiAgICAgIHNldFNjcm9sbFBvc2l0aW9uOiBsb2NhbFNldFNjcm9sbFBvc2l0aW9uLFxuICAgICAgc2V0U2Nyb2xsUGVyY2VudGFnZSAoYXhpcywgcGVyY2VudGFnZSwgZHVyYXRpb24pIHtcbiAgICAgICAgbG9jYWxTZXRTY3JvbGxQb3NpdGlvbihcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIHBlcmNlbnRhZ2VcbiAgICAgICAgICAgICogKHNjcm9sbFsgYXhpcyBdLnNpemUudmFsdWUgLSBjb250YWluZXJbIGF4aXMgXS52YWx1ZSlcbiAgICAgICAgICAgICogKGF4aXMgPT09ICdob3Jpem9udGFsJyAmJiBwcm94eS4kcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IC0xIDogMSksXG4gICAgICAgICAgZHVyYXRpb25cbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIG9uTW91c2VlbnRlcixcbiAgICAgICAgb25Nb3VzZWxlYXZlXG4gICAgICB9LCBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IHRhcmdldFJlZixcbiAgICAgICAgICBjbGFzczogJ3Etc2Nyb2xsYXJlYV9fY29udGFpbmVyIHNjcm9sbCByZWxhdGl2ZS1wb3NpdGlvbiBmaXQgaGlkZS1zY3JvbGxiYXInLFxuICAgICAgICAgIHRhYmluZGV4OiBwcm9wcy50YWJpbmRleCAhPT0gdm9pZCAwID8gcHJvcHMudGFiaW5kZXggOiB2b2lkIDBcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1zY3JvbGxhcmVhX19jb250ZW50IGFic29sdXRlJyxcbiAgICAgICAgICAgIHN0eWxlOiBtYWluU3R5bGUudmFsdWVcbiAgICAgICAgICB9LCBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFtcbiAgICAgICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7XG4gICAgICAgICAgICAgIGRlYm91bmNlOiAwLFxuICAgICAgICAgICAgICBvblJlc2l6ZTogdXBkYXRlU2Nyb2xsU2l6ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSksXG5cbiAgICAgICAgICBoKFFTY3JvbGxPYnNlcnZlciwge1xuICAgICAgICAgICAgYXhpczogJ2JvdGgnLFxuICAgICAgICAgICAgb25TY3JvbGw6IHVwZGF0ZVNjcm9sbFxuICAgICAgICAgIH0pXG4gICAgICAgIF0pLFxuXG4gICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7XG4gICAgICAgICAgZGVib3VuY2U6IDAsXG4gICAgICAgICAgb25SZXNpemU6IHVwZGF0ZUNvbnRhaW5lclxuICAgICAgICB9KSxcblxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6IHNjcm9sbC52ZXJ0aWNhbC5iYXJDbGFzcy52YWx1ZSxcbiAgICAgICAgICBzdHlsZTogWyBwcm9wcy5iYXJTdHlsZSwgcHJvcHMudmVydGljYWxCYXJTdHlsZSBdLFxuICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgICBvbk1vdXNlZG93bjogb25WZXJ0aWNhbE1vdXNlZG93blxuICAgICAgICB9KSxcblxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6IHNjcm9sbC5ob3Jpem9udGFsLmJhckNsYXNzLnZhbHVlLFxuICAgICAgICAgIHN0eWxlOiBbIHByb3BzLmJhclN0eWxlLCBwcm9wcy5ob3Jpem9udGFsQmFyU3R5bGUgXSxcbiAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgb25Nb3VzZWRvd246IG9uSG9yaXpvbnRhbE1vdXNlZG93blxuICAgICAgICB9KSxcblxuICAgICAgICB3aXRoRGlyZWN0aXZlcyhcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICByZWY6IHNjcm9sbC52ZXJ0aWNhbC5yZWYsXG4gICAgICAgICAgICBjbGFzczogc2Nyb2xsLnZlcnRpY2FsLnRodW1iQ2xhc3MudmFsdWUsXG4gICAgICAgICAgICBzdHlsZTogc2Nyb2xsLnZlcnRpY2FsLnN0eWxlLnZhbHVlLFxuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnXG4gICAgICAgICAgfSksXG4gICAgICAgICAgdGh1bWJWZXJ0RGlyXG4gICAgICAgICksXG5cbiAgICAgICAgd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgcmVmOiBzY3JvbGwuaG9yaXpvbnRhbC5yZWYsXG4gICAgICAgICAgICBjbGFzczogc2Nyb2xsLmhvcml6b250YWwudGh1bWJDbGFzcy52YWx1ZSxcbiAgICAgICAgICAgIHN0eWxlOiBzY3JvbGwuaG9yaXpvbnRhbC5zdHlsZS52YWx1ZSxcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRodW1iSG9yaXpEaXJcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IHVzZVJhdGlvUHJvcHMgPSB7XG4gIHJhdGlvOiBbIFN0cmluZywgTnVtYmVyIF1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBuYXR1cmFsUmF0aW8pIHtcbiAgLy8gcmV0dXJuIHJhdGlvU3R5bGVcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCByYXRpbyA9IE51bWJlcihcbiAgICAgIHByb3BzLnJhdGlvIHx8IChuYXR1cmFsUmF0aW8gIT09IHZvaWQgMCA/IG5hdHVyYWxSYXRpby52YWx1ZSA6IHZvaWQgMClcbiAgICApXG5cbiAgICByZXR1cm4gaXNOYU4ocmF0aW8pICE9PSB0cnVlICYmIHJhdGlvID4gMFxuICAgICAgPyB7IHBhZGRpbmdCb3R0b206IGAkeyAxMDAgLyByYXRpbyB9JWAgfVxuICAgICAgOiBudWxsXG4gIH0pXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIFRyYW5zaXRpb24gfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyL1FTcGlubmVyLmpzJ1xuXG5pbXBvcnQgdXNlUmF0aW8sIHsgdXNlUmF0aW9Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJhdGlvLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmNvbnN0IGRlZmF1bHRSYXRpbyA9IDE2IC8gOVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUltZycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VSYXRpb1Byb3BzLFxuXG4gICAgc3JjOiBTdHJpbmcsXG4gICAgc3Jjc2V0OiBTdHJpbmcsXG4gICAgc2l6ZXM6IFN0cmluZyxcblxuICAgIGFsdDogU3RyaW5nLFxuICAgIGNyb3Nzb3JpZ2luOiBTdHJpbmcsXG4gICAgZGVjb2Rpbmc6IFN0cmluZyxcbiAgICByZWZlcnJlcnBvbGljeTogU3RyaW5nLFxuXG4gICAgZHJhZ2dhYmxlOiBCb29sZWFuLFxuXG4gICAgbG9hZGluZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2xhenknXG4gICAgfSxcbiAgICBmZXRjaHByaW9yaXR5OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnYXV0bydcbiAgICB9LFxuICAgIHdpZHRoOiBTdHJpbmcsXG4gICAgaGVpZ2h0OiBTdHJpbmcsXG4gICAgaW5pdGlhbFJhdGlvOiB7XG4gICAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgICBkZWZhdWx0OiBkZWZhdWx0UmF0aW9cbiAgICB9LFxuXG4gICAgcGxhY2Vob2xkZXJTcmM6IFN0cmluZyxcblxuICAgIGZpdDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2NvdmVyJ1xuICAgIH0sXG4gICAgcG9zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICc1MCUgNTAlJ1xuICAgIH0sXG5cbiAgICBpbWdDbGFzczogU3RyaW5nLFxuICAgIGltZ1N0eWxlOiBPYmplY3QsXG5cbiAgICBub1NwaW5uZXI6IEJvb2xlYW4sXG4gICAgbm9OYXRpdmVNZW51OiBCb29sZWFuLFxuICAgIG5vVHJhbnNpdGlvbjogQm9vbGVhbixcblxuICAgIHNwaW5uZXJDb2xvcjogU3RyaW5nLFxuICAgIHNwaW5uZXJTaXplOiBTdHJpbmdcbiAgfSxcblxuICBlbWl0czogWyAnbG9hZCcsICdlcnJvcicgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IG5hdHVyYWxSYXRpbyA9IHJlZihwcm9wcy5pbml0aWFsUmF0aW8pXG4gICAgY29uc3QgcmF0aW9TdHlsZSA9IHVzZVJhdGlvKHByb3BzLCBuYXR1cmFsUmF0aW8pXG5cbiAgICBsZXQgbG9hZFRpbWVyID0gbnVsbCwgaXNEZXN0cm95ZWQgPSBmYWxzZVxuXG4gICAgY29uc3QgaW1hZ2VzID0gW1xuICAgICAgcmVmKG51bGwpLFxuICAgICAgcmVmKGdldFBsYWNlaG9sZGVyU3JjKCkpXG4gICAgXVxuXG4gICAgY29uc3QgcG9zaXRpb24gPSByZWYoMClcblxuICAgIGNvbnN0IGlzTG9hZGluZyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBoYXNFcnJvciA9IHJlZihmYWxzZSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtaW1nIHEtaW1nLS0keyBwcm9wcy5ub05hdGl2ZU1lbnUgPT09IHRydWUgPyAnbm8tJyA6ICcnIH1tZW51YFxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIHdpZHRoOiBwcm9wcy53aWR0aCxcbiAgICAgIGhlaWdodDogcHJvcHMuaGVpZ2h0XG4gICAgfSkpXG5cbiAgICBjb25zdCBpbWdDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1pbWdfX2ltYWdlICR7IHByb3BzLmltZ0NsYXNzICE9PSB2b2lkIDAgPyBwcm9wcy5pbWdDbGFzcyArICcgJyA6ICcnIH1gXG4gICAgICArIGBxLWltZ19faW1hZ2UtLXdpdGgkeyBwcm9wcy5ub1RyYW5zaXRpb24gPT09IHRydWUgPyAnb3V0JyA6ICcnIH0tdHJhbnNpdGlvbmBcbiAgICApXG5cbiAgICBjb25zdCBpbWdTdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICAuLi5wcm9wcy5pbWdTdHlsZSxcbiAgICAgIG9iamVjdEZpdDogcHJvcHMuZml0LFxuICAgICAgb2JqZWN0UG9zaXRpb246IHByb3BzLnBvc2l0aW9uXG4gICAgfSkpXG5cbiAgICB3YXRjaCgoKSA9PiBnZXRDdXJyZW50U3JjKCksIGFkZEltYWdlKVxuXG4gICAgZnVuY3Rpb24gZ2V0Q3VycmVudFNyYyAoKSB7XG4gICAgICByZXR1cm4gcHJvcHMuc3JjIHx8IHByb3BzLnNyY3NldCB8fCBwcm9wcy5zaXplc1xuICAgICAgICA/IHtcbiAgICAgICAgICAgIHNyYzogcHJvcHMuc3JjLFxuICAgICAgICAgICAgc3Jjc2V0OiBwcm9wcy5zcmNzZXQsXG4gICAgICAgICAgICBzaXplczogcHJvcHMuc2l6ZXNcbiAgICAgICAgICB9XG4gICAgICAgIDogbnVsbFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBsYWNlaG9sZGVyU3JjICgpIHtcbiAgICAgIHJldHVybiBwcm9wcy5wbGFjZWhvbGRlclNyYyAhPT0gdm9pZCAwXG4gICAgICAgID8geyBzcmM6IHByb3BzLnBsYWNlaG9sZGVyU3JjIH1cbiAgICAgICAgOiBudWxsXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkSW1hZ2UgKGltZ1Byb3BzKSB7XG4gICAgICBpZiAobG9hZFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChsb2FkVGltZXIpXG4gICAgICAgIGxvYWRUaW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaGFzRXJyb3IudmFsdWUgPSBmYWxzZVxuXG4gICAgICBpZiAoaW1nUHJvcHMgPT09IG51bGwpIHtcbiAgICAgICAgaXNMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgaW1hZ2VzWyBwb3NpdGlvbi52YWx1ZSBeIDEgXS52YWx1ZSA9IGdldFBsYWNlaG9sZGVyU3JjKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpc0xvYWRpbmcudmFsdWUgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGltYWdlc1sgcG9zaXRpb24udmFsdWUgXS52YWx1ZSA9IGltZ1Byb3BzXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Mb2FkICh7IHRhcmdldCB9KSB7XG4gICAgICBpZiAoaXNEZXN0cm95ZWQgPT09IHRydWUpIHsgcmV0dXJuIH1cblxuICAgICAgaWYgKGxvYWRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQobG9hZFRpbWVyKVxuICAgICAgICBsb2FkVGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIG5hdHVyYWxSYXRpby52YWx1ZSA9IHRhcmdldC5uYXR1cmFsSGVpZ2h0ID09PSAwXG4gICAgICAgID8gMC41XG4gICAgICAgIDogdGFyZ2V0Lm5hdHVyYWxXaWR0aCAvIHRhcmdldC5uYXR1cmFsSGVpZ2h0XG5cbiAgICAgIHdhaXRGb3JDb21wbGV0ZW5lc3ModGFyZ2V0LCAxKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhaXRGb3JDb21wbGV0ZW5lc3MgKHRhcmdldCwgY291bnQpIHtcbiAgICAgIC8vIHByb3RlY3QgYWdhaW5zdCBydW5uaW5nIGZvcmV2ZXJcbiAgICAgIGlmIChpc0Rlc3Ryb3llZCA9PT0gdHJ1ZSB8fCBjb3VudCA9PT0gMTAwMCkgeyByZXR1cm4gfVxuXG4gICAgICBpZiAodGFyZ2V0LmNvbXBsZXRlID09PSB0cnVlKSB7XG4gICAgICAgIG9uUmVhZHkodGFyZ2V0KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGxvYWRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxvYWRUaW1lciA9IG51bGxcbiAgICAgICAgICB3YWl0Rm9yQ29tcGxldGVuZXNzKHRhcmdldCwgY291bnQgKyAxKVxuICAgICAgICB9LCA1MClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlYWR5IChpbWcpIHtcbiAgICAgIGlmIChpc0Rlc3Ryb3llZCA9PT0gdHJ1ZSkgeyByZXR1cm4gfVxuXG4gICAgICBwb3NpdGlvbi52YWx1ZSA9IHBvc2l0aW9uLnZhbHVlIF4gMVxuICAgICAgaW1hZ2VzWyBwb3NpdGlvbi52YWx1ZSBdLnZhbHVlID0gbnVsbFxuICAgICAgaXNMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgIGhhc0Vycm9yLnZhbHVlID0gZmFsc2VcbiAgICAgIGVtaXQoJ2xvYWQnLCBpbWcuY3VycmVudFNyYyB8fCBpbWcuc3JjKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRXJyb3IgKGVycikge1xuICAgICAgaWYgKGxvYWRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQobG9hZFRpbWVyKVxuICAgICAgICBsb2FkVGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlzTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICBoYXNFcnJvci52YWx1ZSA9IHRydWVcbiAgICAgIGltYWdlc1sgcG9zaXRpb24udmFsdWUgXS52YWx1ZSA9IG51bGxcbiAgICAgIGltYWdlc1sgcG9zaXRpb24udmFsdWUgXiAxIF0udmFsdWUgPSBnZXRQbGFjZWhvbGRlclNyYygpXG4gICAgICBlbWl0KCdlcnJvcicsIGVycilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJbWFnZSAoaW5kZXgpIHtcbiAgICAgIGNvbnN0IGltZyA9IGltYWdlc1sgaW5kZXggXS52YWx1ZVxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBrZXk6ICdpbWdfJyArIGluZGV4LFxuICAgICAgICBjbGFzczogaW1nQ2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBpbWdTdHlsZS52YWx1ZSxcbiAgICAgICAgY3Jvc3NvcmlnaW46IHByb3BzLmNyb3Nzb3JpZ2luLFxuICAgICAgICBkZWNvZGluZzogcHJvcHMuZGVjb2RpbmcsXG4gICAgICAgIHJlZmVycmVycG9saWN5OiBwcm9wcy5yZWZlcnJlcnBvbGljeSxcbiAgICAgICAgaGVpZ2h0OiBwcm9wcy5oZWlnaHQsXG4gICAgICAgIHdpZHRoOiBwcm9wcy53aWR0aCxcbiAgICAgICAgbG9hZGluZzogcHJvcHMubG9hZGluZyxcbiAgICAgICAgZmV0Y2hwcmlvcml0eTogcHJvcHMuZmV0Y2hwcmlvcml0eSxcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICBkcmFnZ2FibGU6IHByb3BzLmRyYWdnYWJsZSxcbiAgICAgICAgLi4uaW1nXG4gICAgICB9XG5cbiAgICAgIGlmIChwb3NpdGlvbi52YWx1ZSA9PT0gaW5kZXgpIHtcbiAgICAgICAgZGF0YS5jbGFzcyArPSAnIHEtaW1nX19pbWFnZS0td2FpdGluZydcbiAgICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCB7IG9uTG9hZCwgb25FcnJvciB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRhdGEuY2xhc3MgKz0gJyBxLWltZ19faW1hZ2UtLWxvYWRlZCdcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7IGNsYXNzOiAncS1pbWdfX2NvbnRhaW5lciBhYnNvbHV0ZS1mdWxsJywga2V5OiAnaW1nJyArIGluZGV4IH0sXG4gICAgICAgIGgoJ2ltZycsIGRhdGEpXG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBpZiAoaXNMb2FkaW5nLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAga2V5OiAnY29udGVudCcsXG4gICAgICAgICAgY2xhc3M6ICdxLWltZ19fY29udGVudCBhYnNvbHV0ZS1mdWxsIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgICB9LCBoU2xvdChzbG90c1sgaGFzRXJyb3IudmFsdWUgPT09IHRydWUgPyAnZXJyb3InIDogJ2RlZmF1bHQnIF0pKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBrZXk6ICdsb2FkaW5nJyxcbiAgICAgICAgY2xhc3M6ICdxLWltZ19fbG9hZGluZyBhYnNvbHV0ZS1mdWxsIGZsZXggZmxleC1jZW50ZXInXG4gICAgICB9LCAoXG4gICAgICAgIHNsb3RzLmxvYWRpbmcgIT09IHZvaWQgMFxuICAgICAgICAgID8gc2xvdHMubG9hZGluZygpXG4gICAgICAgICAgOiAoXG4gICAgICAgICAgICAgIHByb3BzLm5vU3Bpbm5lciA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgID8gdm9pZCAwXG4gICAgICAgICAgICAgICAgOiBbXG4gICAgICAgICAgICAgICAgICAgIGgoUVNwaW5uZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogcHJvcHMuc3Bpbm5lckNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgIHNpemU6IHByb3BzLnNwaW5uZXJTaXplXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApXG4gICAgICApKVxuICAgIH1cblxuICAgIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18gIT09IHRydWUpIHtcbiAgICAgIGlmIChfX1FVQVNBUl9TU1JfQ0xJRU5UX18pIHtcbiAgICAgICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgICAgICBhZGRJbWFnZShnZXRDdXJyZW50U3JjKCkpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYWRkSW1hZ2UoZ2V0Q3VycmVudFNyYygpKVxuICAgICAgfVxuXG4gICAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgICBpc0Rlc3Ryb3llZCA9IHRydWVcblxuICAgICAgICBpZiAobG9hZFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRUaW1lcilcbiAgICAgICAgICBsb2FkVGltZXIgPSBudWxsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBbXVxuXG4gICAgICBpZiAocmF0aW9TdHlsZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBjb250ZW50LnB1c2goXG4gICAgICAgICAgaCgnZGl2JywgeyBrZXk6ICdmaWxsZXInLCBzdHlsZTogcmF0aW9TdHlsZS52YWx1ZSB9KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNFcnJvci52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICBpZiAoaW1hZ2VzWyAwIF0udmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBjb250ZW50LnB1c2goZ2V0SW1hZ2UoMCkpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW1hZ2VzWyAxIF0udmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBjb250ZW50LnB1c2goZ2V0SW1hZ2UoMSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29udGVudC5wdXNoKFxuICAgICAgICBoKFRyYW5zaXRpb24sIHsgbmFtZTogJ3EtdHJhbnNpdGlvbi0tZmFkZScgfSwgZ2V0Q29udGVudClcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgcm9sZTogJ2ltZycsXG4gICAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMuYWx0XG4gICAgICB9LCBjb250ZW50KVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHdpdGhEaXJlY3RpdmVzLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIG5leHRUaWNrLCBpbmplY3QsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUhpc3RvcnkgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtaGlzdG9yeS5qcydcbmltcG9ydCB1c2VNb2RlbFRvZ2dsZSwgeyB1c2VNb2RlbFRvZ2dsZVByb3BzLCB1c2VNb2RlbFRvZ2dsZUVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtbW9kZWwtdG9nZ2xlLmpzJ1xuaW1wb3J0IHVzZVByZXZlbnRTY3JvbGwgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcHJldmVudC1zY3JvbGwuanMnXG5pbXBvcnQgdXNlVGltZW91dCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10aW1lb3V0LmpzJ1xuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcblxuaW1wb3J0IFRvdWNoUGFuIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvVG91Y2hQYW4uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgYmV0d2VlbiB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC5qcydcbmltcG9ydCB7IGhTbG90LCBoRGlyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmNvbnN0IGR1cmF0aW9uID0gMTUwXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRHJhd2VyJyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlTW9kZWxUb2dnbGVQcm9wcyxcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBzaWRlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnbGVmdCcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gWyAnbGVmdCcsICdyaWdodCcgXS5pbmNsdWRlcyh2KVxuICAgIH0sXG5cbiAgICB3aWR0aDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMzAwXG4gICAgfSxcblxuICAgIG1pbmk6IEJvb2xlYW4sXG4gICAgbWluaVRvT3ZlcmxheTogQm9vbGVhbixcbiAgICBtaW5pV2lkdGg6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDU3XG4gICAgfSxcblxuICAgIGJyZWFrcG9pbnQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDEwMjNcbiAgICB9LFxuICAgIHNob3dJZkFib3ZlOiBCb29sZWFuLFxuXG4gICAgYmVoYXZpb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBbICdkZWZhdWx0JywgJ2Rlc2t0b3AnLCAnbW9iaWxlJyBdLmluY2x1ZGVzKHYpLFxuICAgICAgZGVmYXVsdDogJ2RlZmF1bHQnXG4gICAgfSxcblxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIGVsZXZhdGVkOiBCb29sZWFuLFxuXG4gICAgb3ZlcmxheTogQm9vbGVhbixcbiAgICBwZXJzaXN0ZW50OiBCb29sZWFuLFxuICAgIG5vU3dpcGVPcGVuOiBCb29sZWFuLFxuICAgIG5vU3dpcGVDbG9zZTogQm9vbGVhbixcbiAgICBub1N3aXBlQmFja2Ryb3A6IEJvb2xlYW5cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZU1vZGVsVG9nZ2xlRW1pdHMsXG4gICAgJ29uTGF5b3V0JywgJ21pbmlTdGF0ZSdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQsIGF0dHJzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSB2bVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG4gICAgY29uc3QgeyBwcmV2ZW50Qm9keVNjcm9sbCB9ID0gdXNlUHJldmVudFNjcm9sbCgpXG4gICAgY29uc3QgeyByZWdpc3RlclRpbWVvdXQsIHJlbW92ZVRpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuXG4gICAgY29uc3QgJGxheW91dCA9IGluamVjdChsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4pXG4gICAgaWYgKCRsYXlvdXQgPT09IGVtcHR5UmVuZGVyRm4pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1FEcmF3ZXIgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUUxheW91dCcpXG4gICAgICByZXR1cm4gZW1wdHlSZW5kZXJGblxuICAgIH1cblxuICAgIGxldCBsYXN0RGVza3RvcFN0YXRlLCB0aW1lck1pbmkgPSBudWxsLCBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlclxuXG4gICAgY29uc3QgYmVsb3dCcmVha3BvaW50ID0gcmVmKFxuICAgICAgcHJvcHMuYmVoYXZpb3IgPT09ICdtb2JpbGUnXG4gICAgICB8fCAocHJvcHMuYmVoYXZpb3IgIT09ICdkZXNrdG9wJyAmJiAkbGF5b3V0LnRvdGFsV2lkdGgudmFsdWUgPD0gcHJvcHMuYnJlYWtwb2ludClcbiAgICApXG5cbiAgICBjb25zdCBpc01pbmkgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMubWluaSA9PT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgIT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBzaXplID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgaXNNaW5pLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMubWluaVdpZHRoXG4gICAgICAgIDogcHJvcHMud2lkdGhcbiAgICApKVxuXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihcbiAgICAgIHByb3BzLnNob3dJZkFib3ZlID09PSB0cnVlICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICAgPyB0cnVlXG4gICAgICAgIDogcHJvcHMubW9kZWxWYWx1ZSA9PT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGhpZGVPblJvdXRlQ2hhbmdlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWVcbiAgICAgICYmIChiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUgfHwgb25TY3JlZW5PdmVybGF5LnZhbHVlID09PSB0cnVlKVxuICAgIClcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNob3cgKGV2dCwgbm9FdmVudCkge1xuICAgICAgYWRkVG9IaXN0b3J5KClcblxuICAgICAgZXZ0ICE9PSBmYWxzZSAmJiAkbGF5b3V0LmFuaW1hdGUoKVxuICAgICAgYXBwbHlQb3NpdGlvbigwKVxuXG4gICAgICBpZiAoYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG90aGVySW5zdGFuY2UgPSAkbGF5b3V0Lmluc3RhbmNlc1sgb3RoZXJTaWRlLnZhbHVlIF1cbiAgICAgICAgaWYgKG90aGVySW5zdGFuY2UgIT09IHZvaWQgMCAmJiBvdGhlckluc3RhbmNlLmJlbG93QnJlYWtwb2ludCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG90aGVySW5zdGFuY2UuaGlkZShmYWxzZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5QmFja2Ryb3AoMSlcbiAgICAgICAgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSAhPT0gdHJ1ZSAmJiBwcmV2ZW50Qm9keVNjcm9sbCh0cnVlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFwcGx5QmFja2Ryb3AoMClcbiAgICAgICAgZXZ0ICE9PSBmYWxzZSAmJiBzZXRTY3JvbGxhYmxlKGZhbHNlKVxuICAgICAgfVxuXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBldnQgIT09IGZhbHNlICYmIHNldFNjcm9sbGFibGUodHJ1ZSlcbiAgICAgICAgbm9FdmVudCAhPT0gdHJ1ZSAmJiBlbWl0KCdzaG93JywgZXZ0KVxuICAgICAgfSwgZHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlSGlkZSAoZXZ0LCBub0V2ZW50KSB7XG4gICAgICByZW1vdmVGcm9tSGlzdG9yeSgpXG5cbiAgICAgIGV2dCAhPT0gZmFsc2UgJiYgJGxheW91dC5hbmltYXRlKClcblxuICAgICAgYXBwbHlCYWNrZHJvcCgwKVxuICAgICAgYXBwbHlQb3NpdGlvbihzdGF0ZURpcmVjdGlvbi52YWx1ZSAqIHNpemUudmFsdWUpXG5cbiAgICAgIGNsZWFudXAoKVxuXG4gICAgICBpZiAobm9FdmVudCAhPT0gdHJ1ZSkge1xuICAgICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4geyBlbWl0KCdoaWRlJywgZXZ0KSB9LCBkdXJhdGlvbilcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZW1vdmVUaW1lb3V0KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7IHNob3csIGhpZGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHtcbiAgICAgIHNob3dpbmcsXG4gICAgICBoaWRlT25Sb3V0ZUNoYW5nZSxcbiAgICAgIGhhbmRsZVNob3csXG4gICAgICBoYW5kbGVIaWRlXG4gICAgfSlcblxuICAgIGNvbnN0IHsgYWRkVG9IaXN0b3J5LCByZW1vdmVGcm9tSGlzdG9yeSB9ID0gdXNlSGlzdG9yeShzaG93aW5nLCBoaWRlLCBoaWRlT25Sb3V0ZUNoYW5nZSlcblxuICAgIGNvbnN0IGluc3RhbmNlID0ge1xuICAgICAgYmVsb3dCcmVha3BvaW50LFxuICAgICAgaGlkZVxuICAgIH1cblxuICAgIGNvbnN0IHJpZ2h0U2lkZSA9IGNvbXB1dGVkKCgpID0+IHByb3BzLnNpZGUgPT09ICdyaWdodCcpXG5cbiAgICBjb25zdCBzdGF0ZURpcmVjdGlvbiA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAoJHEubGFuZy5ydGwgPT09IHRydWUgPyAtMSA6IDEpICogKHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZSA/IDEgOiAtMSlcbiAgICApXG5cbiAgICBjb25zdCBmbGFnQmFja2Ryb3BCZyA9IHJlZigwKVxuICAgIGNvbnN0IGZsYWdQYW5uaW5nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGZsYWdNaW5pQW5pbWF0ZSA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBmbGFnQ29udGVudFBvc2l0aW9uID0gcmVmKCAvLyBzdGFydGluZyB3aXRoIFwiaGlkZGVuXCIgZm9yIFNTUlxuICAgICAgc2l6ZS52YWx1ZSAqIHN0YXRlRGlyZWN0aW9uLnZhbHVlXG4gICAgKVxuXG4gICAgY29uc3Qgb3RoZXJTaWRlID0gY29tcHV0ZWQoKCkgPT4gKHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZSA/ICdsZWZ0JyA6ICdyaWdodCcpKVxuICAgIGNvbnN0IG9mZnNldCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSBmYWxzZSAmJiBwcm9wcy5vdmVybGF5ID09PSBmYWxzZVxuICAgICAgICA/IChwcm9wcy5taW5pVG9PdmVybGF5ID09PSB0cnVlID8gcHJvcHMubWluaVdpZHRoIDogc2l6ZS52YWx1ZSlcbiAgICAgICAgOiAwXG4gICAgKSlcblxuICAgIGNvbnN0IGZpeGVkID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm92ZXJsYXkgPT09IHRydWVcbiAgICAgIHx8IHByb3BzLm1pbmlUb092ZXJsYXkgPT09IHRydWVcbiAgICAgIHx8ICRsYXlvdXQudmlldy52YWx1ZS5pbmRleE9mKHJpZ2h0U2lkZS52YWx1ZSA/ICdSJyA6ICdMJykgPiAtMVxuICAgICAgfHwgKCRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSAmJiAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlKVxuICAgIClcblxuICAgIGNvbnN0IG9uTGF5b3V0ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm92ZXJsYXkgPT09IGZhbHNlXG4gICAgICAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IGZhbHNlXG4gICAgKVxuXG4gICAgY29uc3Qgb25TY3JlZW5PdmVybGF5ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm92ZXJsYXkgPT09IHRydWVcbiAgICAgICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2VcbiAgICApXG5cbiAgICBjb25zdCBiYWNrZHJvcENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdmdWxsc2NyZWVuIHEtZHJhd2VyX19iYWNrZHJvcCdcbiAgICAgICsgKHNob3dpbmcudmFsdWUgPT09IGZhbHNlICYmIGZsYWdQYW5uaW5nLnZhbHVlID09PSBmYWxzZSA/ICcgaGlkZGVuJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGJhY2tkcm9wU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBgcmdiYSgwLDAsMCwkeyBmbGFnQmFja2Ryb3BCZy52YWx1ZSAqIDAuNCB9KWBcbiAgICB9KSlcblxuICAgIGNvbnN0IGhlYWRlclNsb3QgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICByaWdodFNpZGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAkbGF5b3V0LnJvd3MudmFsdWUudG9wWyAyIF0gPT09ICdyJ1xuICAgICAgICA6ICRsYXlvdXQucm93cy52YWx1ZS50b3BbIDAgXSA9PT0gJ2wnXG4gICAgKSlcblxuICAgIGNvbnN0IGZvb3RlclNsb3QgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICByaWdodFNpZGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAkbGF5b3V0LnJvd3MudmFsdWUuYm90dG9tWyAyIF0gPT09ICdyJ1xuICAgICAgICA6ICRsYXlvdXQucm93cy52YWx1ZS5ib3R0b21bIDAgXSA9PT0gJ2wnXG4gICAgKSlcblxuICAgIGNvbnN0IGFib3ZlU3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBjc3MgPSB7fVxuXG4gICAgICBpZiAoJGxheW91dC5oZWFkZXIuc3BhY2UgPT09IHRydWUgJiYgaGVhZGVyU2xvdC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGZpeGVkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLnRvcCA9IGAkeyAkbGF5b3V0LmhlYWRlci5vZmZzZXQgfXB4YFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCRsYXlvdXQuaGVhZGVyLnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLnRvcCA9IGAkeyAkbGF5b3V0LmhlYWRlci5zaXplIH1weGBcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoJGxheW91dC5mb290ZXIuc3BhY2UgPT09IHRydWUgJiYgZm9vdGVyU2xvdC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGZpeGVkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLmJvdHRvbSA9IGAkeyAkbGF5b3V0LmZvb3Rlci5vZmZzZXQgfXB4YFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCRsYXlvdXQuZm9vdGVyLnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLmJvdHRvbSA9IGAkeyAkbGF5b3V0LmZvb3Rlci5zaXplIH1weGBcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3NzXG4gICAgfSlcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiBgJHsgc2l6ZS52YWx1ZSB9cHhgLFxuICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7IGZsYWdDb250ZW50UG9zaXRpb24udmFsdWUgfXB4KWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHN0eWxlXG4gICAgICAgIDogT2JqZWN0LmFzc2lnbihzdHlsZSwgYWJvdmVTdHlsZS52YWx1ZSlcbiAgICB9KVxuXG4gICAgY29uc3QgY29udGVudENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWRyYXdlcl9fY29udGVudCBmaXQgJ1xuICAgICAgKyAoJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSAhPT0gdHJ1ZSA/ICdzY3JvbGwnIDogJ292ZXJmbG93LWF1dG8nKVxuICAgIClcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtZHJhd2VyIHEtZHJhd2VyLS0keyBwcm9wcy5zaWRlIH1gXG4gICAgICArIChmbGFnTWluaUFuaW1hdGUudmFsdWUgPT09IHRydWUgPyAnIHEtZHJhd2VyLS1taW5pLWFuaW1hdGUnIDogJycpXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS1kcmF3ZXItLWJvcmRlcmVkJyA6ICcnKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWRyYXdlci0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICArIChcbiAgICAgICAgZmxhZ1Bhbm5pbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/ICcgbm8tdHJhbnNpdGlvbidcbiAgICAgICAgICA6IChzaG93aW5nLnZhbHVlID09PSB0cnVlID8gJycgOiAnIHEtbGF5b3V0LS1wcmV2ZW50LWZvY3VzJylcbiAgICAgIClcbiAgICAgICsgKFxuICAgICAgICBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/ICcgZml4ZWQgcS1kcmF3ZXItLW9uLXRvcCBxLWRyYXdlci0tbW9iaWxlIHEtZHJhd2VyLS10b3AtcGFkZGluZydcbiAgICAgICAgICA6IGAgcS1kcmF3ZXItLSR7IGlzTWluaS52YWx1ZSA9PT0gdHJ1ZSA/ICdtaW5pJyA6ICdzdGFuZGFyZCcgfWBcbiAgICAgICAgICArIChmaXhlZC52YWx1ZSA9PT0gdHJ1ZSB8fCBvbkxheW91dC52YWx1ZSAhPT0gdHJ1ZSA/ICcgZml4ZWQnIDogJycpXG4gICAgICAgICAgKyAocHJvcHMub3ZlcmxheSA9PT0gdHJ1ZSB8fCBwcm9wcy5taW5pVG9PdmVybGF5ID09PSB0cnVlID8gJyBxLWRyYXdlci0tb24tdG9wJyA6ICcnKVxuICAgICAgICAgICsgKGhlYWRlclNsb3QudmFsdWUgPT09IHRydWUgPyAnIHEtZHJhd2VyLS10b3AtcGFkZGluZycgOiAnJylcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBvcGVuRGlyZWN0aXZlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgLy8gaWYgcHJvcHMubm9Td2lwZU9wZW4gIT09IHRydWVcbiAgICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gcHJvcHMuc2lkZSA6IG90aGVyU2lkZS52YWx1ZVxuXG4gICAgICByZXR1cm4gWyBbXG4gICAgICAgIFRvdWNoUGFuLFxuICAgICAgICBvbk9wZW5QYW4sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAge1xuICAgICAgICAgIFsgZGlyIF06IHRydWUsXG4gICAgICAgICAgbW91c2U6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSBdXG4gICAgfSlcblxuICAgIGNvbnN0IGNvbnRlbnRDbG9zZURpcmVjdGl2ZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIC8vIGlmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5ub1N3aXBlQ2xvc2UgIT09IHRydWVcbiAgICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gb3RoZXJTaWRlLnZhbHVlIDogcHJvcHMuc2lkZVxuXG4gICAgICByZXR1cm4gWyBbXG4gICAgICAgIFRvdWNoUGFuLFxuICAgICAgICBvbkNsb3NlUGFuLFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHtcbiAgICAgICAgICBbIGRpciBdOiB0cnVlLFxuICAgICAgICAgIG1vdXNlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0gXVxuICAgIH0pXG5cbiAgICBjb25zdCBiYWNrZHJvcENsb3NlRGlyZWN0aXZlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgLy8gaWYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5ub1N3aXBlQmFja2Ryb3AgIT09IHRydWVcbiAgICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gb3RoZXJTaWRlLnZhbHVlIDogcHJvcHMuc2lkZVxuXG4gICAgICByZXR1cm4gWyBbXG4gICAgICAgIFRvdWNoUGFuLFxuICAgICAgICBvbkNsb3NlUGFuLFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHtcbiAgICAgICAgICBbIGRpciBdOiB0cnVlLFxuICAgICAgICAgIG1vdXNlOiB0cnVlLFxuICAgICAgICAgIG1vdXNlQWxsRGlyOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0gXVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVCZWxvd0JyZWFrcG9pbnQgKCkge1xuICAgICAgdXBkYXRlTG9jYWwoYmVsb3dCcmVha3BvaW50LCAoXG4gICAgICAgIHByb3BzLmJlaGF2aW9yID09PSAnbW9iaWxlJ1xuICAgICAgICB8fCAocHJvcHMuYmVoYXZpb3IgIT09ICdkZXNrdG9wJyAmJiAkbGF5b3V0LnRvdGFsV2lkdGgudmFsdWUgPD0gcHJvcHMuYnJlYWtwb2ludClcbiAgICAgICkpXG4gICAgfVxuXG4gICAgd2F0Y2goYmVsb3dCcmVha3BvaW50LCB2YWwgPT4ge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkgeyAvLyBmcm9tIGxnIHRvIHhzXG4gICAgICAgIGxhc3REZXNrdG9wU3RhdGUgPSBzaG93aW5nLnZhbHVlXG4gICAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgaGlkZShmYWxzZSlcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKFxuICAgICAgICBwcm9wcy5vdmVybGF5ID09PSBmYWxzZVxuICAgICAgICAmJiBwcm9wcy5iZWhhdmlvciAhPT0gJ21vYmlsZSdcbiAgICAgICAgJiYgbGFzdERlc2t0b3BTdGF0ZSAhPT0gZmFsc2VcbiAgICAgICkgeyAvLyBmcm9tIHhzIHRvIGxnXG4gICAgICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgYXBwbHlQb3NpdGlvbigwKVxuICAgICAgICAgIGFwcGx5QmFja2Ryb3AoMClcbiAgICAgICAgICBjbGVhbnVwKClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzaG93KGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLnNpZGUsIChuZXdTaWRlLCBvbGRTaWRlKSA9PiB7XG4gICAgICBpZiAoJGxheW91dC5pbnN0YW5jZXNbIG9sZFNpZGUgXSA9PT0gaW5zdGFuY2UpIHtcbiAgICAgICAgJGxheW91dC5pbnN0YW5jZXNbIG9sZFNpZGUgXSA9IHZvaWQgMFxuICAgICAgICAkbGF5b3V0WyBvbGRTaWRlIF0uc3BhY2UgPSBmYWxzZVxuICAgICAgICAkbGF5b3V0WyBvbGRTaWRlIF0ub2Zmc2V0ID0gMFxuICAgICAgfVxuXG4gICAgICAkbGF5b3V0Lmluc3RhbmNlc1sgbmV3U2lkZSBdID0gaW5zdGFuY2VcbiAgICAgICRsYXlvdXRbIG5ld1NpZGUgXS5zaXplID0gc2l6ZS52YWx1ZVxuICAgICAgJGxheW91dFsgbmV3U2lkZSBdLnNwYWNlID0gb25MYXlvdXQudmFsdWVcbiAgICAgICRsYXlvdXRbIG5ld1NpZGUgXS5vZmZzZXQgPSBvZmZzZXQudmFsdWVcbiAgICB9KVxuXG4gICAgd2F0Y2goJGxheW91dC50b3RhbFdpZHRoLCAoKSA9PiB7XG4gICAgICBpZiAoJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZSB8fCBkb2N1bWVudC5xU2Nyb2xsUHJldmVudGVkICE9PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZUJlbG93QnJlYWtwb2ludCgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKFxuICAgICAgKCkgPT4gcHJvcHMuYmVoYXZpb3IgKyBwcm9wcy5icmVha3BvaW50LFxuICAgICAgdXBkYXRlQmVsb3dCcmVha3BvaW50XG4gICAgKVxuXG4gICAgd2F0Y2goJGxheW91dC5pc0NvbnRhaW5lciwgdmFsID0+IHtcbiAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgcHJldmVudEJvZHlTY3JvbGwodmFsICE9PSB0cnVlKVxuICAgICAgdmFsID09PSB0cnVlICYmIHVwZGF0ZUJlbG93QnJlYWtwb2ludCgpXG4gICAgfSlcblxuICAgIHdhdGNoKCRsYXlvdXQuc2Nyb2xsYmFyV2lkdGgsICgpID0+IHtcbiAgICAgIGFwcGx5UG9zaXRpb24oc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/IDAgOiB2b2lkIDApXG4gICAgfSlcblxuICAgIHdhdGNoKG9mZnNldCwgdmFsID0+IHsgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCB2YWwpIH0pXG5cbiAgICB3YXRjaChvbkxheW91dCwgdmFsID0+IHtcbiAgICAgIGVtaXQoJ29uTGF5b3V0JywgdmFsKVxuICAgICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIHZhbClcbiAgICB9KVxuXG4gICAgd2F0Y2gocmlnaHRTaWRlLCAoKSA9PiB7IGFwcGx5UG9zaXRpb24oKSB9KVxuXG4gICAgd2F0Y2goc2l6ZSwgdmFsID0+IHtcbiAgICAgIGFwcGx5UG9zaXRpb24oKVxuICAgICAgdXBkYXRlU2l6ZU9uTGF5b3V0KHByb3BzLm1pbmlUb092ZXJsYXksIHZhbClcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubWluaVRvT3ZlcmxheSwgdmFsID0+IHtcbiAgICAgIHVwZGF0ZVNpemVPbkxheW91dCh2YWwsIHNpemUudmFsdWUpXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+ICRxLmxhbmcucnRsLCAoKSA9PiB7IGFwcGx5UG9zaXRpb24oKSB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubWluaSwgKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgYW5pbWF0ZU1pbmkoKVxuICAgICAgICAkbGF5b3V0LmFuaW1hdGUoKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB3YXRjaChpc01pbmksIHZhbCA9PiB7IGVtaXQoJ21pbmlTdGF0ZScsIHZhbCkgfSlcblxuICAgIGZ1bmN0aW9uIGFwcGx5UG9zaXRpb24gKHBvc2l0aW9uKSB7XG4gICAgICBpZiAocG9zaXRpb24gPT09IHZvaWQgMCkge1xuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgcG9zaXRpb24gPSBzaG93aW5nLnZhbHVlID09PSB0cnVlID8gMCA6IHNpemUudmFsdWVcbiAgICAgICAgICBhcHBseVBvc2l0aW9uKHN0YXRlRGlyZWN0aW9uLnZhbHVlICogcG9zaXRpb24pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAmJiByaWdodFNpZGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAmJiAoYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlIHx8IE1hdGguYWJzKHBvc2l0aW9uKSA9PT0gc2l6ZS52YWx1ZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcG9zaXRpb24gKz0gc3RhdGVEaXJlY3Rpb24udmFsdWUgKiAkbGF5b3V0LnNjcm9sbGJhcldpZHRoLnZhbHVlXG4gICAgICAgIH1cblxuICAgICAgICBmbGFnQ29udGVudFBvc2l0aW9uLnZhbHVlID0gcG9zaXRpb25cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBseUJhY2tkcm9wICh4KSB7XG4gICAgICBmbGFnQmFja2Ryb3BCZy52YWx1ZSA9IHhcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRTY3JvbGxhYmxlICh2KSB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB2ID09PSB0cnVlXG4gICAgICAgID8gJ3JlbW92ZSdcbiAgICAgICAgOiAoJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSAhPT0gdHJ1ZSA/ICdhZGQnIDogJycpXG5cbiAgICAgIGFjdGlvbiAhPT0gJycgJiYgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3RbIGFjdGlvbiBdKCdxLWJvZHktLWRyYXdlci10b2dnbGUnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuaW1hdGVNaW5pICgpIHtcbiAgICAgIHRpbWVyTWluaSAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQodGltZXJNaW5pKVxuXG4gICAgICBpZiAodm0ucHJveHkgJiYgdm0ucHJveHkuJGVsKSB7XG4gICAgICAgIC8vIG5lZWQgdG8gc3BlZWQgaXQgdXAgYW5kIGFwcGx5IGl0IGltbWVkaWF0ZWx5LFxuICAgICAgICAvLyBldmVuIGZhc3RlciB0aGFuIFZ1ZSdzIG5leHRUaWNrIVxuICAgICAgICB2bS5wcm94eS4kZWwuY2xhc3NMaXN0LmFkZCgncS1kcmF3ZXItLW1pbmktYW5pbWF0ZScpXG4gICAgICB9XG5cbiAgICAgIGZsYWdNaW5pQW5pbWF0ZS52YWx1ZSA9IHRydWVcbiAgICAgIHRpbWVyTWluaSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lck1pbmkgPSBudWxsXG4gICAgICAgIGZsYWdNaW5pQW5pbWF0ZS52YWx1ZSA9IGZhbHNlXG4gICAgICAgIGlmICh2bSAmJiB2bS5wcm94eSAmJiB2bS5wcm94eS4kZWwpIHtcbiAgICAgICAgICB2bS5wcm94eS4kZWwuY2xhc3NMaXN0LnJlbW92ZSgncS1kcmF3ZXItLW1pbmktYW5pbWF0ZScpXG4gICAgICAgIH1cbiAgICAgIH0sIDE1MClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk9wZW5QYW4gKGV2dCkge1xuICAgICAgaWYgKHNob3dpbmcudmFsdWUgIT09IGZhbHNlKSB7XG4gICAgICAgIC8vIHNvbWUgYnJvd3NlcnMgbWlnaHQgY2FwdHVyZSBhbmQgdHJpZ2dlciB0aGlzXG4gICAgICAgIC8vIGV2ZW4gaWYgRHJhd2VyIGhhcyBqdXN0IGJlZW4gb3BlbmVkIChidXQgYW5pbWF0aW9uIGlzIHN0aWxsIHBlbmRpbmcpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICB3aWR0aCA9IHNpemUudmFsdWUsXG4gICAgICAgIHBvc2l0aW9uID0gYmV0d2VlbihldnQuZGlzdGFuY2UueCwgMCwgd2lkdGgpXG5cbiAgICAgIGlmIChldnQuaXNGaW5hbCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBvcGVuZWQgPSBwb3NpdGlvbiA+PSBNYXRoLm1pbig3NSwgd2lkdGgpXG5cbiAgICAgICAgaWYgKG9wZW5lZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHNob3coKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICAgICAgYXBwbHlCYWNrZHJvcCgwKVxuICAgICAgICAgIGFwcGx5UG9zaXRpb24oc3RhdGVEaXJlY3Rpb24udmFsdWUgKiB3aWR0aClcbiAgICAgICAgfVxuXG4gICAgICAgIGZsYWdQYW5uaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGFwcGx5UG9zaXRpb24oXG4gICAgICAgICgkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IHJpZ2h0U2lkZS52YWx1ZSAhPT0gdHJ1ZSA6IHJpZ2h0U2lkZS52YWx1ZSlcbiAgICAgICAgICA/IE1hdGgubWF4KHdpZHRoIC0gcG9zaXRpb24sIDApXG4gICAgICAgICAgOiBNYXRoLm1pbigwLCBwb3NpdGlvbiAtIHdpZHRoKVxuICAgICAgKVxuICAgICAgYXBwbHlCYWNrZHJvcChcbiAgICAgICAgYmV0d2Vlbihwb3NpdGlvbiAvIHdpZHRoLCAwLCAxKVxuICAgICAgKVxuXG4gICAgICBpZiAoZXZ0LmlzRmlyc3QgPT09IHRydWUpIHtcbiAgICAgICAgZmxhZ1Bhbm5pbmcudmFsdWUgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbG9zZVBhbiAoZXZ0KSB7XG4gICAgICBpZiAoc2hvd2luZy52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAvLyBzb21lIGJyb3dzZXJzIG1pZ2h0IGNhcHR1cmUgYW5kIHRyaWdnZXIgdGhpc1xuICAgICAgICAvLyBldmVuIGlmIERyYXdlciBoYXMganVzdCBiZWVuIGNsb3NlZCAoYnV0IGFuaW1hdGlvbiBpcyBzdGlsbCBwZW5kaW5nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3RcbiAgICAgICAgd2lkdGggPSBzaXplLnZhbHVlLFxuICAgICAgICBkaXIgPSBldnQuZGlyZWN0aW9uID09PSBwcm9wcy5zaWRlLFxuICAgICAgICBwb3NpdGlvbiA9ICgkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IGRpciAhPT0gdHJ1ZSA6IGRpcilcbiAgICAgICAgICA/IGJldHdlZW4oZXZ0LmRpc3RhbmNlLngsIDAsIHdpZHRoKVxuICAgICAgICAgIDogMFxuXG4gICAgICBpZiAoZXZ0LmlzRmluYWwgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgb3BlbmVkID0gTWF0aC5hYnMocG9zaXRpb24pIDwgTWF0aC5taW4oNzUsIHdpZHRoKVxuXG4gICAgICAgIGlmIChvcGVuZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAkbGF5b3V0LmFuaW1hdGUoKVxuICAgICAgICAgIGFwcGx5QmFja2Ryb3AoMSlcbiAgICAgICAgICBhcHBseVBvc2l0aW9uKDApXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaGlkZSgpXG4gICAgICAgIH1cblxuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9IGZhbHNlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBhcHBseVBvc2l0aW9uKHN0YXRlRGlyZWN0aW9uLnZhbHVlICogcG9zaXRpb24pXG4gICAgICBhcHBseUJhY2tkcm9wKGJldHdlZW4oMSAtIHBvc2l0aW9uIC8gd2lkdGgsIDAsIDEpKVxuXG4gICAgICBpZiAoZXZ0LmlzRmlyc3QgPT09IHRydWUpIHtcbiAgICAgICAgZmxhZ1Bhbm5pbmcudmFsdWUgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoKSB7XG4gICAgICBwcmV2ZW50Qm9keVNjcm9sbChmYWxzZSlcbiAgICAgIHNldFNjcm9sbGFibGUodHJ1ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMYXlvdXQgKHByb3AsIHZhbCkge1xuICAgICAgJGxheW91dC51cGRhdGUocHJvcHMuc2lkZSwgcHJvcCwgdmFsKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsIChwcm9wLCB2YWwpIHtcbiAgICAgIGlmIChwcm9wLnZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgcHJvcC52YWx1ZSA9IHZhbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNpemVPbkxheW91dCAobWluaVRvT3ZlcmxheSwgc2l6ZSkge1xuICAgICAgdXBkYXRlTGF5b3V0KCdzaXplJywgbWluaVRvT3ZlcmxheSA9PT0gdHJ1ZSA/IHByb3BzLm1pbmlXaWR0aCA6IHNpemUpXG4gICAgfVxuXG4gICAgJGxheW91dC5pbnN0YW5jZXNbIHByb3BzLnNpZGUgXSA9IGluc3RhbmNlXG4gICAgdXBkYXRlU2l6ZU9uTGF5b3V0KHByb3BzLm1pbmlUb092ZXJsYXksIHNpemUudmFsdWUpXG4gICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIG9uTGF5b3V0LnZhbHVlKVxuICAgIHVwZGF0ZUxheW91dCgnb2Zmc2V0Jywgb2Zmc2V0LnZhbHVlKVxuXG4gICAgaWYgKFxuICAgICAgcHJvcHMuc2hvd0lmQWJvdmUgPT09IHRydWVcbiAgICAgICYmIHByb3BzLm1vZGVsVmFsdWUgIT09IHRydWVcbiAgICAgICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICYmIHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwXG4gICAgKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHRydWUpXG4gICAgfVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIGVtaXQoJ29uTGF5b3V0Jywgb25MYXlvdXQudmFsdWUpXG4gICAgICBlbWl0KCdtaW5pU3RhdGUnLCBpc01pbmkudmFsdWUpXG5cbiAgICAgIGxhc3REZXNrdG9wU3RhdGUgPSBwcm9wcy5zaG93SWZBYm92ZSA9PT0gdHJ1ZVxuXG4gICAgICBjb25zdCBmbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/IGhhbmRsZVNob3cgOiBoYW5kbGVIaWRlXG4gICAgICAgIGFjdGlvbihmYWxzZSwgdHJ1ZSlcbiAgICAgIH1cblxuICAgICAgaWYgKCRsYXlvdXQudG90YWxXaWR0aC52YWx1ZSAhPT0gMCkge1xuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCBhbGwgY29tcHV0ZWQgcHJvcGVydGllc1xuICAgICAgICAvLyBoYXZlIGJlZW4gdXBkYXRlZCBiZWZvcmUgY2FsbGluZyBoYW5kbGVTaG93L2hhbmRsZUhpZGUoKVxuICAgICAgICBuZXh0VGljayhmbilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyID0gd2F0Y2goJGxheW91dC50b3RhbFdpZHRoLCAoKSA9PiB7XG4gICAgICAgIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyKClcbiAgICAgICAgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXIgPSB2b2lkIDBcblxuICAgICAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gZmFsc2UgJiYgcHJvcHMuc2hvd0lmQWJvdmUgPT09IHRydWUgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgIHNob3coZmFsc2UpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZm4oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXIgIT09IHZvaWQgMCAmJiBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlcigpXG5cbiAgICAgIGlmICh0aW1lck1pbmkgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyTWluaSlcbiAgICAgICAgdGltZXJNaW5pID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIGNsZWFudXAoKVxuXG4gICAgICBpZiAoJGxheW91dC5pbnN0YW5jZXNbIHByb3BzLnNpZGUgXSA9PT0gaW5zdGFuY2UpIHtcbiAgICAgICAgJGxheW91dC5pbnN0YW5jZXNbIHByb3BzLnNpZGUgXSA9IHZvaWQgMFxuICAgICAgICB1cGRhdGVMYXlvdXQoJ3NpemUnLCAwKVxuICAgICAgICB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIDApXG4gICAgICAgIHVwZGF0ZUxheW91dCgnc3BhY2UnLCBmYWxzZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gW11cblxuICAgICAgaWYgKGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBwcm9wcy5ub1N3aXBlT3BlbiA9PT0gZmFsc2UgJiYgY2hpbGQucHVzaChcbiAgICAgICAgICB3aXRoRGlyZWN0aXZlcyhcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAga2V5OiAnb3BlbicsXG4gICAgICAgICAgICAgIGNsYXNzOiBgcS1kcmF3ZXJfX29wZW5lciBmaXhlZC0keyBwcm9wcy5zaWRlIH1gLFxuICAgICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgb3BlbkRpcmVjdGl2ZS52YWx1ZVxuICAgICAgICAgIClcbiAgICAgICAgKVxuXG4gICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgaERpcihcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByZWY6ICdiYWNrZHJvcCcsXG4gICAgICAgICAgICAgIGNsYXNzOiBiYWNrZHJvcENsYXNzLnZhbHVlLFxuICAgICAgICAgICAgICBzdHlsZTogYmFja2Ryb3BTdHlsZS52YWx1ZSxcbiAgICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICAgICAgICBvbkNsaWNrOiBoaWRlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdm9pZCAwLFxuICAgICAgICAgICAgJ2JhY2tkcm9wJyxcbiAgICAgICAgICAgIHByb3BzLm5vU3dpcGVCYWNrZHJvcCAhPT0gdHJ1ZSAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlLFxuICAgICAgICAgICAgKCkgPT4gYmFja2Ryb3BDbG9zZURpcmVjdGl2ZS52YWx1ZVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBtaW5pID0gaXNNaW5pLnZhbHVlID09PSB0cnVlICYmIHNsb3RzLm1pbmkgIT09IHZvaWQgMFxuICAgICAgY29uc3QgY29udGVudCA9IFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIC4uLmF0dHJzLFxuICAgICAgICAgIGtleTogJycgKyBtaW5pLCAvLyByZXF1aXJlZCBvdGhlcndpc2UgVnVlIHdpbGwgbm90IGRpZmYgY29ycmVjdGx5XG4gICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgIGNvbnRlbnRDbGFzcy52YWx1ZSxcbiAgICAgICAgICAgIGF0dHJzLmNsYXNzXG4gICAgICAgICAgXVxuICAgICAgICB9LCBtaW5pID09PSB0cnVlXG4gICAgICAgICAgPyBzbG90cy5taW5pKClcbiAgICAgICAgICA6IGhTbG90KHNsb3RzLmRlZmF1bHQpXG4gICAgICAgIClcbiAgICAgIF1cblxuICAgICAgaWYgKHByb3BzLmVsZXZhdGVkID09PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29udGVudC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1sYXlvdXRfX3NoYWRvdyBhYnNvbHV0ZS1mdWxsIG92ZXJmbG93LWhpZGRlbiBuby1wb2ludGVyLWV2ZW50cydcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgIGhEaXIoXG4gICAgICAgICAgJ2FzaWRlJyxcbiAgICAgICAgICB7IHJlZjogJ2NvbnRlbnQnLCBjbGFzczogY2xhc3Nlcy52YWx1ZSwgc3R5bGU6IHN0eWxlLnZhbHVlIH0sXG4gICAgICAgICAgY29udGVudCxcbiAgICAgICAgICAnY29udGVudGNsb3NlJyxcbiAgICAgICAgICBwcm9wcy5ub1N3aXBlQ2xvc2UgIT09IHRydWUgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlLFxuICAgICAgICAgICgpID0+IGNvbnRlbnRDbG9zZURpcmVjdGl2ZS52YWx1ZVxuICAgICAgICApXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiAncS1kcmF3ZXItY29udGFpbmVyJyB9LCBjaGlsZClcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgcHJvdmlkZSwgaW5qZWN0LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IHBhZ2VDb250YWluZXJLZXksIGxheW91dEtleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FQYWdlQ29udGFpbmVyJyxcblxuICBzZXR1cCAoXywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgJGxheW91dCA9IGluamVjdChsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4pXG4gICAgaWYgKCRsYXlvdXQgPT09IGVtcHR5UmVuZGVyRm4pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1FQYWdlQ29udGFpbmVyIG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBwcm92aWRlKHBhZ2VDb250YWluZXJLZXksIHRydWUpXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGNzcyA9IHt9XG5cbiAgICAgIGlmICgkbGF5b3V0LmhlYWRlci5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3MucGFkZGluZ1RvcCA9IGAkeyAkbGF5b3V0LmhlYWRlci5zaXplIH1weGBcbiAgICAgIH1cbiAgICAgIGlmICgkbGF5b3V0LnJpZ2h0LnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzc1sgYHBhZGRpbmckeyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdMZWZ0JyA6ICdSaWdodCcgfWAgXSA9IGAkeyAkbGF5b3V0LnJpZ2h0LnNpemUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKCRsYXlvdXQuZm9vdGVyLnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzcy5wYWRkaW5nQm90dG9tID0gYCR7ICRsYXlvdXQuZm9vdGVyLnNpemUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKCRsYXlvdXQubGVmdC5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3NbIGBwYWRkaW5nJHsgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnUmlnaHQnIDogJ0xlZnQnIH1gIF0gPSBgJHsgJGxheW91dC5sZWZ0LnNpemUgfXB4YFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3NzXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogJ3EtcGFnZS1jb250YWluZXInLFxuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlXG4gICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIHJlYWN0aXZlLCBjb21wdXRlZCwgd2F0Y2gsIHByb3ZpZGUsIG9uVW5tb3VudGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGlzUnVudGltZVNzclByZUh5ZHJhdGlvbiB9IGZyb20gJy4uLy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmltcG9ydCBRU2Nyb2xsT2JzZXJ2ZXIgZnJvbSAnLi4vc2Nyb2xsLW9ic2VydmVyL1FTY3JvbGxPYnNlcnZlci5qcydcbmltcG9ydCBRUmVzaXplT2JzZXJ2ZXIgZnJvbSAnLi4vcmVzaXplLW9ic2VydmVyL1FSZXNpemVPYnNlcnZlci5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBnZXRTY3JvbGxiYXJXaWR0aCB9IGZyb20gJy4uLy4uL3V0aWxzL3Njcm9sbC5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGxheW91dEtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FMYXlvdXQnLFxuXG4gIHByb3BzOiB7XG4gICAgY29udGFpbmVyOiBCb29sZWFuLFxuICAgIHZpZXc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdoaGggbHByIGZmZicsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gL14oaHxsKWgoaHxyKSBscHIgKGZ8bClmKGZ8cikkLy50ZXN0KHYudG9Mb3dlckNhc2UoKSlcbiAgICB9LFxuXG4gICAgb25TY3JvbGw6IEZ1bmN0aW9uLFxuICAgIG9uU2Nyb2xsSGVpZ2h0OiBGdW5jdGlvbixcbiAgICBvblJlc2l6ZTogRnVuY3Rpb25cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcblxuICAgIC8vIHBhZ2UgcmVsYXRlZFxuICAgIGNvbnN0IGhlaWdodCA9IHJlZigkcS5zY3JlZW4uaGVpZ2h0KVxuICAgIGNvbnN0IHdpZHRoID0gcmVmKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSA/IDAgOiAkcS5zY3JlZW4ud2lkdGgpXG4gICAgY29uc3Qgc2Nyb2xsID0gcmVmKHsgcG9zaXRpb246IDAsIGRpcmVjdGlvbjogJ2Rvd24nLCBpbmZsZWN0aW9uUG9pbnQ6IDAgfSlcblxuICAgIC8vIGNvbnRhaW5lciBvbmx5IHByb3BcbiAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSByZWYoMClcbiAgICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IHJlZihpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUgPT09IHRydWUgPyAwIDogZ2V0U2Nyb2xsYmFyV2lkdGgoKSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtbGF5b3V0IHEtbGF5b3V0LS0nXG4gICAgICArIChwcm9wcy5jb250YWluZXIgPT09IHRydWUgPyAnY29udGFpbmVyaXplZCcgOiAnc3RhbmRhcmQnKVxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuY29udGFpbmVyID09PSBmYWxzZVxuICAgICAgICA/IHsgbWluSGVpZ2h0OiAkcS5zY3JlZW4uaGVpZ2h0ICsgJ3B4JyB9XG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICAvLyB1c2VkIGJ5IGNvbnRhaW5lciBvbmx5XG4gICAgY29uc3QgdGFyZ2V0U3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBzY3JvbGxiYXJXaWR0aC52YWx1ZSAhPT0gMFxuICAgICAgICA/IHsgWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdsZWZ0JyA6ICdyaWdodCcgXTogYCR7IHNjcm9sbGJhcldpZHRoLnZhbHVlIH1weGAgfVxuICAgICAgICA6IG51bGxcbiAgICApKVxuXG4gICAgY29uc3QgdGFyZ2V0Q2hpbGRTdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHNjcm9sbGJhcldpZHRoLnZhbHVlICE9PSAwXG4gICAgICAgID8ge1xuICAgICAgICAgICAgWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnbGVmdCcgXTogMCxcbiAgICAgICAgICAgIFsgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnbGVmdCcgOiAncmlnaHQnIF06IGAtJHsgc2Nyb2xsYmFyV2lkdGgudmFsdWUgfXB4YCxcbiAgICAgICAgICAgIHdpZHRoOiBgY2FsYygxMDAlICsgJHsgc2Nyb2xsYmFyV2lkdGgudmFsdWUgfXB4KWBcbiAgICAgICAgICB9XG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICBmdW5jdGlvbiBvblBhZ2VTY3JvbGwgKGRhdGEpIHtcbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUgfHwgZG9jdW1lbnQucVNjcm9sbFByZXZlbnRlZCAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgIHBvc2l0aW9uOiBkYXRhLnBvc2l0aW9uLnRvcCxcbiAgICAgICAgICBkaXJlY3Rpb246IGRhdGEuZGlyZWN0aW9uLFxuICAgICAgICAgIGRpcmVjdGlvbkNoYW5nZWQ6IGRhdGEuZGlyZWN0aW9uQ2hhbmdlZCxcbiAgICAgICAgICBpbmZsZWN0aW9uUG9pbnQ6IGRhdGEuaW5mbGVjdGlvblBvaW50LnRvcCxcbiAgICAgICAgICBkZWx0YTogZGF0YS5kZWx0YS50b3BcbiAgICAgICAgfVxuXG4gICAgICAgIHNjcm9sbC52YWx1ZSA9IGluZm9cbiAgICAgICAgcHJvcHMub25TY3JvbGwgIT09IHZvaWQgMCAmJiBlbWl0KCdzY3JvbGwnLCBpbmZvKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGFnZVJlc2l6ZSAoZGF0YSkge1xuICAgICAgY29uc3QgeyBoZWlnaHQ6IG5ld0hlaWdodCwgd2lkdGg6IG5ld1dpZHRoIH0gPSBkYXRhXG4gICAgICBsZXQgcmVzaXplZCA9IGZhbHNlXG5cbiAgICAgIGlmIChoZWlnaHQudmFsdWUgIT09IG5ld0hlaWdodCkge1xuICAgICAgICByZXNpemVkID0gdHJ1ZVxuICAgICAgICBoZWlnaHQudmFsdWUgPSBuZXdIZWlnaHRcbiAgICAgICAgcHJvcHMub25TY3JvbGxIZWlnaHQgIT09IHZvaWQgMCAmJiBlbWl0KCdzY3JvbGxIZWlnaHQnLCBuZXdIZWlnaHQpXG4gICAgICAgIHVwZGF0ZVNjcm9sbGJhcldpZHRoKClcbiAgICAgIH1cbiAgICAgIGlmICh3aWR0aC52YWx1ZSAhPT0gbmV3V2lkdGgpIHtcbiAgICAgICAgcmVzaXplZCA9IHRydWVcbiAgICAgICAgd2lkdGgudmFsdWUgPSBuZXdXaWR0aFxuICAgICAgfVxuXG4gICAgICBpZiAocmVzaXplZCA9PT0gdHJ1ZSAmJiBwcm9wcy5vblJlc2l6ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVtaXQoJ3Jlc2l6ZScsIGRhdGEpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Db250YWluZXJSZXNpemUgKHsgaGVpZ2h0IH0pIHtcbiAgICAgIGlmIChjb250YWluZXJIZWlnaHQudmFsdWUgIT09IGhlaWdodCkge1xuICAgICAgICBjb250YWluZXJIZWlnaHQudmFsdWUgPSBoZWlnaHRcbiAgICAgICAgdXBkYXRlU2Nyb2xsYmFyV2lkdGgoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbGJhcldpZHRoICgpIHtcbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBoZWlnaHQudmFsdWUgPiBjb250YWluZXJIZWlnaHQudmFsdWVcbiAgICAgICAgICA/IGdldFNjcm9sbGJhcldpZHRoKClcbiAgICAgICAgICA6IDBcblxuICAgICAgICBpZiAoc2Nyb2xsYmFyV2lkdGgudmFsdWUgIT09IHdpZHRoKSB7XG4gICAgICAgICAgc2Nyb2xsYmFyV2lkdGgudmFsdWUgPSB3aWR0aFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGFuaW1hdGVUaW1lciA9IG51bGxcblxuICAgIGNvbnN0ICRsYXlvdXQgPSB7XG4gICAgICBpbnN0YW5jZXM6IHt9LFxuICAgICAgdmlldzogY29tcHV0ZWQoKCkgPT4gcHJvcHMudmlldyksXG4gICAgICBpc0NvbnRhaW5lcjogY29tcHV0ZWQoKCkgPT4gcHJvcHMuY29udGFpbmVyKSxcblxuICAgICAgcm9vdFJlZixcblxuICAgICAgaGVpZ2h0LFxuICAgICAgY29udGFpbmVySGVpZ2h0LFxuICAgICAgc2Nyb2xsYmFyV2lkdGgsXG4gICAgICB0b3RhbFdpZHRoOiBjb21wdXRlZCgoKSA9PiB3aWR0aC52YWx1ZSArIHNjcm9sbGJhcldpZHRoLnZhbHVlKSxcblxuICAgICAgcm93czogY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBjb25zdCByb3dzID0gcHJvcHMudmlldy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJylcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b3A6IHJvd3NbIDAgXS5zcGxpdCgnJyksXG4gICAgICAgICAgbWlkZGxlOiByb3dzWyAxIF0uc3BsaXQoJycpLFxuICAgICAgICAgIGJvdHRvbTogcm93c1sgMiBdLnNwbGl0KCcnKVxuICAgICAgICB9XG4gICAgICB9KSxcblxuICAgICAgaGVhZGVyOiByZWFjdGl2ZSh7IHNpemU6IDAsIG9mZnNldDogMCwgc3BhY2U6IGZhbHNlIH0pLFxuICAgICAgcmlnaHQ6IHJlYWN0aXZlKHsgc2l6ZTogMzAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcbiAgICAgIGZvb3RlcjogcmVhY3RpdmUoeyBzaXplOiAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcbiAgICAgIGxlZnQ6IHJlYWN0aXZlKHsgc2l6ZTogMzAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcblxuICAgICAgc2Nyb2xsLFxuXG4gICAgICBhbmltYXRlICgpIHtcbiAgICAgICAgaWYgKGFuaW1hdGVUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChhbmltYXRlVGltZXIpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLWxheW91dC1hbmltYXRlJylcbiAgICAgICAgfVxuXG4gICAgICAgIGFuaW1hdGVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGFuaW1hdGVUaW1lciA9IG51bGxcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tbGF5b3V0LWFuaW1hdGUnKVxuICAgICAgICB9LCAxNTUpXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGUgKHBhcnQsIHByb3AsIHZhbCkge1xuICAgICAgICAkbGF5b3V0WyBwYXJ0IF1bIHByb3AgXSA9IHZhbFxuICAgICAgfVxuICAgIH1cblxuICAgIHByb3ZpZGUobGF5b3V0S2V5LCAkbGF5b3V0KVxuXG4gICAgLy8gcHJldmVudCBzY3JvbGxiYXIgZmxpY2tlciB3aGlsZSByZXNpemluZyB3aW5kb3cgaGVpZ2h0XG4gICAgLy8gaWYgbm8gcGFnZSBzY3JvbGxiYXIgaXMgYWxyZWFkeSBwcmVzZW50XG4gICAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXyAhPT0gdHJ1ZSAmJiBnZXRTY3JvbGxiYXJXaWR0aCgpID4gMCkge1xuICAgICAgbGV0IHRpbWVyID0gbnVsbFxuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5ib2R5XG5cbiAgICAgIGZ1bmN0aW9uIHJlc3RvcmVTY3JvbGxiYXIgKCkge1xuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zY3JvbGxiYXInKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBoaWRlU2Nyb2xsYmFyICgpIHtcbiAgICAgICAgaWYgKHRpbWVyID09PSBudWxsKSB7XG4gICAgICAgICAgLy8gaWYgaXQgaGFzIG5vIHNjcm9sbGJhciB0aGVuIHRoZXJlJ3Mgbm90aGluZyB0byBkb1xuXG4gICAgICAgICAgaWYgKGVsLnNjcm9sbEhlaWdodCA+ICRxLnNjcmVlbi5oZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2hpZGUtc2Nyb2xsYmFyJylcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIH1cblxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQocmVzdG9yZVNjcm9sbGJhciwgMzAwKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVTY3JvbGxFdmVudCAoYWN0aW9uKSB7XG4gICAgICAgIGlmICh0aW1lciAhPT0gbnVsbCAmJiBhY3Rpb24gPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAgIHJlc3RvcmVTY3JvbGxiYXIoKVxuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93WyBgJHsgYWN0aW9uIH1FdmVudExpc3RlbmVyYCBdKCdyZXNpemUnLCBoaWRlU2Nyb2xsYmFyKVxuICAgICAgfVxuXG4gICAgICB3YXRjaChcbiAgICAgICAgKCkgPT4gKHByb3BzLmNvbnRhaW5lciAhPT0gdHJ1ZSA/ICdhZGQnIDogJ3JlbW92ZScpLFxuICAgICAgICB1cGRhdGVTY3JvbGxFdmVudFxuICAgICAgKVxuXG4gICAgICBwcm9wcy5jb250YWluZXIgIT09IHRydWUgJiYgdXBkYXRlU2Nyb2xsRXZlbnQoJ2FkZCcpXG5cbiAgICAgIG9uVW5tb3VudGVkKCgpID0+IHtcbiAgICAgICAgdXBkYXRlU2Nyb2xsRXZlbnQoJ3JlbW92ZScpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgIGgoUVNjcm9sbE9ic2VydmVyLCB7IG9uU2Nyb2xsOiBvblBhZ2VTY3JvbGwgfSksXG4gICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7IG9uUmVzaXplOiBvblBhZ2VSZXNpemUgfSlcbiAgICAgIF0pXG5cbiAgICAgIGNvbnN0IGxheW91dCA9IGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgcmVmOiBwcm9wcy5jb250YWluZXIgPT09IHRydWUgPyB2b2lkIDAgOiByb290UmVmLFxuICAgICAgICB0YWJpbmRleDogLTFcbiAgICAgIH0sIGNvbnRlbnQpXG5cbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtbGF5b3V0LWNvbnRhaW5lciBvdmVyZmxvdy1oaWRkZW4nLFxuICAgICAgICAgIHJlZjogcm9vdFJlZlxuICAgICAgICB9LCBbXG4gICAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHsgb25SZXNpemU6IG9uQ29udGFpbmVyUmVzaXplIH0pLFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAnYWJzb2x1dGUtZnVsbCcsXG4gICAgICAgICAgICBzdHlsZTogdGFyZ2V0U3R5bGUudmFsdWVcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAnc2Nyb2xsJyxcbiAgICAgICAgICAgICAgc3R5bGU6IHRhcmdldENoaWxkU3R5bGUudmFsdWVcbiAgICAgICAgICAgIH0sIFsgbGF5b3V0IF0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxheW91dFxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtaXRlbVxuICAgIGNsaWNrYWJsZVxuICAgIHRhZz1cImFcIlxuICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgOmhyZWY9XCJsaW5rXCJcbiAgPlxuICAgIDxxLWl0ZW0tc2VjdGlvblxuICAgICAgdi1pZj1cImljb25cIlxuICAgICAgYXZhdGFyXG4gICAgPlxuICAgICAgPHEtaWNvbiA6bmFtZT1cImljb25cIiAvPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICA8cS1pdGVtLWxhYmVsPnt7IHRpdGxlIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+e3sgY2FwdGlvbiB9fTwvcS1pdGVtLWxhYmVsPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gIDwvcS1pdGVtPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IGRlZmluZUNvbXBvbmVudCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ0Vzc2VudGlhbExpbmsnLFxuICBwcm9wczoge1xuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG5cbiAgICBjYXB0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJ1xuICAgIH0sXG5cbiAgICBsaW5rOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnIydcbiAgICB9LFxuXG4gICAgaWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJydcbiAgICB9XG4gIH1cbn0pXG48L3NjcmlwdD5cbiIsIi8vIHRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2phbGFhbGkvamFsYWFsaS1qc1xuXG4vKlxuICBKYWxhYWxpIHllYXJzIHN0YXJ0aW5nIHRoZSAzMy15ZWFyIHJ1bGUuXG4qL1xuY29uc3QgYnJlYWtzID0gW1xuICAtNjEsIDksIDM4LCAxOTksIDQyNiwgNjg2LCA3NTYsIDgxOCwgMTExMSwgMTE4MSwgMTIxMCxcbiAgMTYzNSwgMjA2MCwgMjA5NywgMjE5MiwgMjI2MiwgMjMyNCwgMjM5NCwgMjQ1NiwgMzE3OFxuXVxuXG4vKlxuICBDb252ZXJ0cyBhIEdyZWdvcmlhbiBkYXRlIHRvIEphbGFhbGkuXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHRvSmFsYWFsaSAoZ3ksIGdtLCBnZCkge1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGd5KSA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgZ2QgPSBneS5nZXREYXRlKClcbiAgICBnbSA9IGd5LmdldE1vbnRoKCkgKyAxXG4gICAgZ3kgPSBneS5nZXRGdWxsWWVhcigpXG4gIH1cbiAgcmV0dXJuIGQyaihnMmQoZ3ksIGdtLCBnZCkpXG59XG5cbi8qXG4gIENvbnZlcnRzIGEgSmFsYWFsaSBkYXRlIHRvIEdyZWdvcmlhbi5cbiovXG5leHBvcnQgZnVuY3Rpb24gdG9HcmVnb3JpYW4gKGp5LCBqbSwgamQpIHtcbiAgcmV0dXJuIGQyZyhqMmQoanksIGptLCBqZCkpXG59XG5cbi8qXG4gIElzIHRoaXMgYSBsZWFwIHllYXIgb3Igbm90P1xuKi9cbmZ1bmN0aW9uIGlzTGVhcEphbGFhbGlZZWFyIChqeSkge1xuICByZXR1cm4gamFsQ2FsTGVhcChqeSkgPT09IDBcbn1cblxuLypcbiAgTnVtYmVyIG9mIGRheXMgaW4gYSBnaXZlbiBtb250aCBpbiBhIEphbGFhbGkgeWVhci5cbiovXG5leHBvcnQgZnVuY3Rpb24gamFsYWFsaU1vbnRoTGVuZ3RoIChqeSwgam0pIHtcbiAgaWYgKGptIDw9IDYpIHJldHVybiAzMVxuICBpZiAoam0gPD0gMTEpIHJldHVybiAzMFxuICBpZiAoaXNMZWFwSmFsYWFsaVllYXIoankpKSByZXR1cm4gMzBcbiAgcmV0dXJuIDI5XG59XG5cbi8qXG4gICAgVGhpcyBmdW5jdGlvbiBkZXRlcm1pbmVzIGlmIHRoZSBKYWxhYWxpIChQZXJzaWFuKSB5ZWFyIGlzXG4gICAgbGVhcCAoMzY2LWRheSBsb25nKSBvciBpcyB0aGUgY29tbW9uIHllYXIgKDM2NSBkYXlzKVxuXG4gICAgQHBhcmFtIGp5IEphbGFhbGkgY2FsZW5kYXIgeWVhciAoLTYxIHRvIDMxNzcpXG4gICAgQHJldHVybnMgbnVtYmVyIG9mIHllYXJzIHNpbmNlIHRoZSBsYXN0IGxlYXAgeWVhciAoMCB0byA0KVxuICovXG5mdW5jdGlvbiBqYWxDYWxMZWFwIChqeSkge1xuICBjb25zdCBibCA9IGJyZWFrcy5sZW5ndGhcbiAgbGV0XG4gICAganAgPSBicmVha3NbIDAgXSxcbiAgICBqbSxcbiAgICBqdW1wLFxuICAgIGxlYXAsXG4gICAgbixcbiAgICBpXG5cbiAgaWYgKGp5IDwganAgfHwgankgPj0gYnJlYWtzWyBibCAtIDEgXSkgeyB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgSmFsYWFsaSB5ZWFyICcgKyBqeSkgfVxuXG4gIGZvciAoaSA9IDE7IGkgPCBibDsgaSArPSAxKSB7XG4gICAgam0gPSBicmVha3NbIGkgXVxuICAgIGp1bXAgPSBqbSAtIGpwXG4gICAgaWYgKGp5IDwgam0pIHsgYnJlYWsgfVxuICAgIGpwID0gam1cbiAgfVxuICBuID0gankgLSBqcFxuXG4gIGlmIChqdW1wIC0gbiA8IDYpIHsgbiA9IG4gLSBqdW1wICsgZGl2KGp1bXAgKyA0LCAzMykgKiAzMyB9XG4gIGxlYXAgPSBtb2QobW9kKG4gKyAxLCAzMykgLSAxLCA0KVxuICBpZiAobGVhcCA9PT0gLTEpIHtcbiAgICBsZWFwID0gNFxuICB9XG5cbiAgcmV0dXJuIGxlYXBcbn1cblxuLypcbiAgVGhpcyBmdW5jdGlvbiBkZXRlcm1pbmVzIGlmIHRoZSBKYWxhYWxpIChQZXJzaWFuKSB5ZWFyIGlzXG4gIGxlYXAgKDM2Ni1kYXkgbG9uZykgb3IgaXMgdGhlIGNvbW1vbiB5ZWFyICgzNjUgZGF5cyksIGFuZFxuICBmaW5kcyB0aGUgZGF5IGluIE1hcmNoIChHcmVnb3JpYW4gY2FsZW5kYXIpIG9mIHRoZSBmaXJzdFxuICBkYXkgb2YgdGhlIEphbGFhbGkgeWVhciAoankpLlxuXG4gIEBwYXJhbSBqeSBKYWxhYWxpIGNhbGVuZGFyIHllYXIgKC02MSB0byAzMTc3KVxuICBAcGFyYW0gd2l0aG91dExlYXAgd2hlbiBkb24ndCBuZWVkIGxlYXAgKHRydWUgb3IgZmFsc2UpIGRlZmF1bHQgaXMgZmFsc2VcbiAgQHJldHVyblxuICAgIGxlYXA6IG51bWJlciBvZiB5ZWFycyBzaW5jZSB0aGUgbGFzdCBsZWFwIHllYXIgKDAgdG8gNClcbiAgICBneTogR3JlZ29yaWFuIHllYXIgb2YgdGhlIGJlZ2lubmluZyBvZiBKYWxhYWxpIHllYXJcbiAgICBtYXJjaDogdGhlIE1hcmNoIGRheSBvZiBGYXJ2YXJkaW4gdGhlIDFzdCAoMXN0IGRheSBvZiBqeSlcbiAgQHNlZTogaHR0cDovL3d3dy5hc3Ryby51bmkudG9ydW4ucGwvfmtiL1BhcGVycy9FTVAvUGVyc2lhbkMtRU1QLmh0bVxuICBAc2VlOiBodHRwOi8vd3d3LmZvdXJtaWxhYi5jaC9kb2N1bWVudHMvY2FsZW5kYXIvXG4qL1xuZnVuY3Rpb24gamFsQ2FsIChqeSwgd2l0aG91dExlYXApIHtcbiAgY29uc3RcbiAgICBibCA9IGJyZWFrcy5sZW5ndGgsXG4gICAgZ3kgPSBqeSArIDYyMVxuICBsZXRcbiAgICBsZWFwSiA9IC0xNCxcbiAgICBqcCA9IGJyZWFrc1sgMCBdLFxuICAgIGptLFxuICAgIGp1bXAsXG4gICAgbGVhcCxcbiAgICBuLFxuICAgIGlcblxuICBpZiAoankgPCBqcCB8fCBqeSA+PSBicmVha3NbIGJsIC0gMSBdKSB7IHRocm93IG5ldyBFcnJvcignSW52YWxpZCBKYWxhYWxpIHllYXIgJyArIGp5KSB9XG5cbiAgLy8gRmluZCB0aGUgbGltaXRpbmcgeWVhcnMgZm9yIHRoZSBKYWxhYWxpIHllYXIgankuXG4gIGZvciAoaSA9IDE7IGkgPCBibDsgaSArPSAxKSB7XG4gICAgam0gPSBicmVha3NbIGkgXVxuICAgIGp1bXAgPSBqbSAtIGpwXG4gICAgaWYgKGp5IDwgam0pIHsgYnJlYWsgfVxuICAgIGxlYXBKID0gbGVhcEogKyBkaXYoanVtcCwgMzMpICogOCArIGRpdihtb2QoanVtcCwgMzMpLCA0KVxuICAgIGpwID0gam1cbiAgfVxuICBuID0gankgLSBqcFxuXG4gIC8vIEZpbmQgdGhlIG51bWJlciBvZiBsZWFwIHllYXJzIGZyb20gQUQgNjIxIHRvIHRoZSBiZWdpbm5pbmdcbiAgLy8gb2YgdGhlIGN1cnJlbnQgSmFsYWFsaSB5ZWFyIGluIHRoZSBQZXJzaWFuIGNhbGVuZGFyLlxuICBsZWFwSiA9IGxlYXBKICsgZGl2KG4sIDMzKSAqIDggKyBkaXYobW9kKG4sIDMzKSArIDMsIDQpXG4gIGlmIChtb2QoanVtcCwgMzMpID09PSA0ICYmIGp1bXAgLSBuID09PSA0KSB7IGxlYXBKICs9IDEgfVxuXG4gIC8vIEFuZCB0aGUgc2FtZSBpbiB0aGUgR3JlZ29yaWFuIGNhbGVuZGFyICh1bnRpbCB0aGUgeWVhciBneSkuXG4gIGNvbnN0IGxlYXBHID0gZGl2KGd5LCA0KSAtIGRpdigoZGl2KGd5LCAxMDApICsgMSkgKiAzLCA0KSAtIDE1MFxuXG4gIC8vIERldGVybWluZSB0aGUgR3JlZ29yaWFuIGRhdGUgb2YgRmFydmFyZGluIHRoZSAxc3QuXG4gIGNvbnN0IG1hcmNoID0gMjAgKyBsZWFwSiAtIGxlYXBHXG5cbiAgLy8gRmluZCBob3cgbWFueSB5ZWFycyBoYXZlIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCBsZWFwIHllYXIuXG4gIGlmICghd2l0aG91dExlYXApIHtcbiAgICBpZiAoanVtcCAtIG4gPCA2KSB7IG4gPSBuIC0ganVtcCArIGRpdihqdW1wICsgNCwgMzMpICogMzMgfVxuICAgIGxlYXAgPSBtb2QobW9kKG4gKyAxLCAzMykgLSAxLCA0KVxuICAgIGlmIChsZWFwID09PSAtMSkge1xuICAgICAgbGVhcCA9IDRcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxlYXAsXG4gICAgZ3ksXG4gICAgbWFyY2hcbiAgfVxufVxuXG4vKlxuICBDb252ZXJ0cyBhIGRhdGUgb2YgdGhlIEphbGFhbGkgY2FsZW5kYXIgdG8gdGhlIEp1bGlhbiBEYXkgbnVtYmVyLlxuXG4gIEBwYXJhbSBqeSBKYWxhYWxpIHllYXIgKDEgdG8gMzEwMClcbiAgQHBhcmFtIGptIEphbGFhbGkgbW9udGggKDEgdG8gMTIpXG4gIEBwYXJhbSBqZCBKYWxhYWxpIGRheSAoMSB0byAyOS8zMSlcbiAgQHJldHVybiBKdWxpYW4gRGF5IG51bWJlclxuKi9cbmZ1bmN0aW9uIGoyZCAoanksIGptLCBqZCkge1xuICBjb25zdCByID0gamFsQ2FsKGp5LCB0cnVlKVxuICByZXR1cm4gZzJkKHIuZ3ksIDMsIHIubWFyY2gpICsgKGptIC0gMSkgKiAzMSAtIGRpdihqbSwgNykgKiAoam0gLSA3KSArIGpkIC0gMVxufVxuXG4vKlxuICBDb252ZXJ0cyB0aGUgSnVsaWFuIERheSBudW1iZXIgdG8gYSBkYXRlIGluIHRoZSBKYWxhYWxpIGNhbGVuZGFyLlxuXG4gIEBwYXJhbSBqZG4gSnVsaWFuIERheSBudW1iZXJcbiAgQHJldHVyblxuICAgIGp5OiBKYWxhYWxpIHllYXIgKDEgdG8gMzEwMClcbiAgICBqbTogSmFsYWFsaSBtb250aCAoMSB0byAxMilcbiAgICBqZDogSmFsYWFsaSBkYXkgKDEgdG8gMjkvMzEpXG4qL1xuZnVuY3Rpb24gZDJqIChqZG4pIHtcbiAgY29uc3QgZ3kgPSBkMmcoamRuKS5neSAvLyBDYWxjdWxhdGUgR3JlZ29yaWFuIHllYXIgKGd5KS5cbiAgbGV0XG4gICAgankgPSBneSAtIDYyMSxcbiAgICBqZCxcbiAgICBqbSxcbiAgICBrXG4gIGNvbnN0XG4gICAgciA9IGphbENhbChqeSwgZmFsc2UpLFxuICAgIGpkbjFmID0gZzJkKGd5LCAzLCByLm1hcmNoKVxuXG4gIC8vIEZpbmQgbnVtYmVyIG9mIGRheXMgdGhhdCBwYXNzZWQgc2luY2UgMSBGYXJ2YXJkaW4uXG4gIGsgPSBqZG4gLSBqZG4xZlxuICBpZiAoayA+PSAwKSB7XG4gICAgaWYgKGsgPD0gMTg1KSB7XG4gICAgICAvLyBUaGUgZmlyc3QgNiBtb250aHMuXG4gICAgICBqbSA9IDEgKyBkaXYoaywgMzEpXG4gICAgICBqZCA9IG1vZChrLCAzMSkgKyAxXG4gICAgICByZXR1cm4ge1xuICAgICAgICBqeSxcbiAgICAgICAgam0sXG4gICAgICAgIGpkXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gVGhlIHJlbWFpbmluZyBtb250aHMuXG4gICAgICBrIC09IDE4NlxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICAvLyBQcmV2aW91cyBKYWxhYWxpIHllYXIuXG4gICAgankgLT0gMVxuICAgIGsgKz0gMTc5XG4gICAgaWYgKHIubGVhcCA9PT0gMSkgeyBrICs9IDEgfVxuICB9XG4gIGptID0gNyArIGRpdihrLCAzMClcbiAgamQgPSBtb2QoaywgMzApICsgMVxuICByZXR1cm4ge1xuICAgIGp5LFxuICAgIGptLFxuICAgIGpkXG4gIH1cbn1cblxuLypcbiAgQ2FsY3VsYXRlcyB0aGUgSnVsaWFuIERheSBudW1iZXIgZnJvbSBHcmVnb3JpYW4gb3IgSnVsaWFuXG4gIGNhbGVuZGFyIGRhdGVzLiBUaGlzIGludGVnZXIgbnVtYmVyIGNvcnJlc3BvbmRzIHRvIHRoZSBub29uIG9mXG4gIHRoZSBkYXRlIChpLmUuIDEyIGhvdXJzIG9mIFVuaXZlcnNhbCBUaW1lKS5cbiAgVGhlIHByb2NlZHVyZSB3YXMgdGVzdGVkIHRvIGJlIGdvb2Qgc2luY2UgMSBNYXJjaCwgLTEwMDEwMCAob2YgYm90aFxuICBjYWxlbmRhcnMpIHVwIHRvIGEgZmV3IG1pbGxpb24geWVhcnMgaW50byB0aGUgZnV0dXJlLlxuXG4gIEBwYXJhbSBneSBDYWxlbmRhciB5ZWFyICh5ZWFycyBCQyBudW1iZXJlZCAwLCAtMSwgLTIsIC4uLilcbiAgQHBhcmFtIGdtIENhbGVuZGFyIG1vbnRoICgxIHRvIDEyKVxuICBAcGFyYW0gZ2QgQ2FsZW5kYXIgZGF5IG9mIHRoZSBtb250aCAoMSB0byAyOC8yOS8zMC8zMSlcbiAgQHJldHVybiBKdWxpYW4gRGF5IG51bWJlclxuKi9cbmZ1bmN0aW9uIGcyZCAoZ3ksIGdtLCBnZCkge1xuICBsZXQgZCA9IGRpdigoZ3kgKyBkaXYoZ20gLSA4LCA2KSArIDEwMDEwMCkgKiAxNDYxLCA0KVxuICAgICAgKyBkaXYoMTUzICogbW9kKGdtICsgOSwgMTIpICsgMiwgNSlcbiAgICAgICsgZ2QgLSAzNDg0MDQwOFxuICBkID0gZCAtIGRpdihkaXYoZ3kgKyAxMDAxMDAgKyBkaXYoZ20gLSA4LCA2KSwgMTAwKSAqIDMsIDQpICsgNzUyXG4gIHJldHVybiBkXG59XG5cbi8qXG4gIENhbGN1bGF0ZXMgR3JlZ29yaWFuIGFuZCBKdWxpYW4gY2FsZW5kYXIgZGF0ZXMgZnJvbSB0aGUgSnVsaWFuIERheSBudW1iZXJcbiAgKGpkbikgZm9yIHRoZSBwZXJpb2Qgc2luY2UgamRuPS0zNDgzOTY1NSAoaS5lLiB0aGUgeWVhciAtMTAwMTAwIG9mIGJvdGhcbiAgY2FsZW5kYXJzKSB0byBzb21lIG1pbGxpb25zIHllYXJzIGFoZWFkIG9mIHRoZSBwcmVzZW50LlxuXG4gIEBwYXJhbSBqZG4gSnVsaWFuIERheSBudW1iZXJcbiAgQHJldHVyblxuICAgIGd5OiBDYWxlbmRhciB5ZWFyICh5ZWFycyBCQyBudW1iZXJlZCAwLCAtMSwgLTIsIC4uLilcbiAgICBnbTogQ2FsZW5kYXIgbW9udGggKDEgdG8gMTIpXG4gICAgZ2Q6IENhbGVuZGFyIGRheSBvZiB0aGUgbW9udGggTSAoMSB0byAyOC8yOS8zMC8zMSlcbiovXG5mdW5jdGlvbiBkMmcgKGpkbikge1xuICBsZXQgaiA9IDQgKiBqZG4gKyAxMzkzNjE2MzFcbiAgaiA9IGogKyBkaXYoZGl2KDQgKiBqZG4gKyAxODMxODc3MjAsIDE0NjA5NykgKiAzLCA0KSAqIDQgLSAzOTA4XG4gIGNvbnN0XG4gICAgaSA9IGRpdihtb2QoaiwgMTQ2MSksIDQpICogNSArIDMwOCxcbiAgICBnZCA9IGRpdihtb2QoaSwgMTUzKSwgNSkgKyAxLFxuICAgIGdtID0gbW9kKGRpdihpLCAxNTMpLCAxMikgKyAxLFxuICAgIGd5ID0gZGl2KGosIDE0NjEpIC0gMTAwMTAwICsgZGl2KDggLSBnbSwgNilcbiAgcmV0dXJuIHtcbiAgICBneSxcbiAgICBnbSxcbiAgICBnZFxuICB9XG59XG5cbi8qXG4gIFV0aWxpdHkgaGVscGVyIGZ1bmN0aW9ucy5cbiovXG5cbmZ1bmN0aW9uIGRpdiAoYSwgYikge1xuICByZXR1cm4gfn4oYSAvIGIpXG59XG5cbmZ1bmN0aW9uIG1vZCAoYSwgYikge1xuICByZXR1cm4gYSAtIH5+KGEgLyBiKSAqIGJcbn1cbiIsIi8qIGVzbGludCBuby1mYWxsdGhyb3VnaDogMCAqL1xuXG5pbXBvcnQgeyBpc0RhdGUgfSBmcm9tICcuL2lzLmpzJ1xuaW1wb3J0IHsgcGFkLCBjYXBpdGFsaXplIH0gZnJvbSAnLi9mb3JtYXQuanMnXG5pbXBvcnQgeyBqYWxhYWxpTW9udGhMZW5ndGggfSBmcm9tICcuL3ByaXZhdGUvZGF0ZS1wZXJzaWFuLmpzJ1xuaW1wb3J0IGxhbmcsIHsgZGVmYXVsdExhbmcgfSBmcm9tICcuLi9sYW5nLmpzJ1xuXG5jb25zdFxuICBNSUxMSVNFQ09ORFNfSU5fREFZID0gODY0MDAwMDAsXG4gIE1JTExJU0VDT05EU19JTl9IT1VSID0gMzYwMDAwMCxcbiAgTUlMTElTRUNPTkRTX0lOX01JTlVURSA9IDYwMDAwLFxuICBkZWZhdWx0TWFzayA9ICdZWVlZLU1NLUREVEhIOm1tOnNzLlNTU1onLFxuICB0b2tlbiA9IC9cXFsoKD86W15cXF1cXFxcXXxcXFxcXXxcXFxcKSopXFxdfGR7MSw0fXxNezEsNH18bXsxLDJ9fHd7MSwyfXxRb3xEb3xEezEsNH18WVkoPzpZWSk/fEh7MSwyfXxoezEsMn18c3sxLDJ9fFN7MSwzfXxaezEsMn18YXsxLDJ9fFtBUUV4WF0vZyxcbiAgcmV2ZXJzZVRva2VuID0gLyhcXFtbXlxcXV0qXFxdKXxkezEsNH18TXsxLDR9fG17MSwyfXx3ezEsMn18UW98RG98RHsxLDR9fFlZKD86WVkpP3xIezEsMn18aHsxLDJ9fHN7MSwyfXxTezEsM318WnsxLDJ9fGF7MSwyfXxbQVFFeFhdfChbLiorOj9eLFxccyR7fSgpfFxcXFxdKykvZyxcbiAgcmVnZXhTdG9yZSA9IHt9XG5cbmZ1bmN0aW9uIGdldFJlZ2V4RGF0YSAobWFzaywgZGF0ZUxvY2FsZSkge1xuICBjb25zdFxuICAgIGRheXMgPSAnKCcgKyBkYXRlTG9jYWxlLmRheXMuam9pbignfCcpICsgJyknLFxuICAgIGtleSA9IG1hc2sgKyBkYXlzXG5cbiAgaWYgKHJlZ2V4U3RvcmVbIGtleSBdICE9PSB2b2lkIDApIHtcbiAgICByZXR1cm4gcmVnZXhTdG9yZVsga2V5IF1cbiAgfVxuXG4gIGNvbnN0XG4gICAgZGF5c1Nob3J0ID0gJygnICsgZGF0ZUxvY2FsZS5kYXlzU2hvcnQuam9pbignfCcpICsgJyknLFxuICAgIG1vbnRocyA9ICcoJyArIGRhdGVMb2NhbGUubW9udGhzLmpvaW4oJ3wnKSArICcpJyxcbiAgICBtb250aHNTaG9ydCA9ICcoJyArIGRhdGVMb2NhbGUubW9udGhzU2hvcnQuam9pbignfCcpICsgJyknXG5cbiAgY29uc3QgbWFwID0ge31cbiAgbGV0IGluZGV4ID0gMFxuXG4gIGNvbnN0IHJlZ2V4VGV4dCA9IG1hc2sucmVwbGFjZShyZXZlcnNlVG9rZW4sIG1hdGNoID0+IHtcbiAgICBpbmRleCsrXG4gICAgc3dpdGNoIChtYXRjaCkge1xuICAgICAgY2FzZSAnWVknOlxuICAgICAgICBtYXAuWVkgPSBpbmRleFxuICAgICAgICByZXR1cm4gJygtP1xcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnWVlZWSc6XG4gICAgICAgIG1hcC5ZWVlZID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoLT9cXFxcZHsxLDR9KSdcbiAgICAgIGNhc2UgJ00nOlxuICAgICAgICBtYXAuTSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnTU0nOlxuICAgICAgICBtYXAuTSA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gTVxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdNTU0nOlxuICAgICAgICBtYXAuTU1NID0gaW5kZXhcbiAgICAgICAgcmV0dXJuIG1vbnRoc1Nob3J0XG4gICAgICBjYXNlICdNTU1NJzpcbiAgICAgICAgbWFwLk1NTU0gPSBpbmRleFxuICAgICAgICByZXR1cm4gbW9udGhzXG4gICAgICBjYXNlICdEJzpcbiAgICAgICAgbWFwLkQgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ0RvJzpcbiAgICAgICAgbWFwLkQgPSBpbmRleCsrIC8vIGJ1bXBpbmcgdG8gRFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KHN0fG5kfHJkfHRoKSknXG4gICAgICBjYXNlICdERCc6XG4gICAgICAgIG1hcC5EID0gaW5kZXggLy8gYnVtcGluZyB0byBEXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ0gnOlxuICAgICAgICBtYXAuSCA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnSEgnOlxuICAgICAgICBtYXAuSCA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gSFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdoJzpcbiAgICAgICAgbWFwLmggPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ2hoJzpcbiAgICAgICAgbWFwLmggPSBpbmRleCAvLyBidW1waW5nIHRvIGhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7Mn0pJ1xuICAgICAgY2FzZSAnbSc6XG4gICAgICAgIG1hcC5tID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfSknXG4gICAgICBjYXNlICdtbSc6XG4gICAgICAgIG1hcC5tID0gaW5kZXggLy8gYnVtcGluZyB0byBtXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ3MnOlxuICAgICAgICBtYXAucyA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnc3MnOlxuICAgICAgICBtYXAucyA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gc1xuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdTJzpcbiAgICAgICAgbWFwLlMgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxfSknXG4gICAgICBjYXNlICdTUyc6XG4gICAgICAgIG1hcC5TID0gaW5kZXggLy8gYnVtcCB0byBTXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ1NTUyc6XG4gICAgICAgIG1hcC5TID0gaW5kZXggLy8gYnVtcCB0byBTXG4gICAgICAgIHJldHVybiAnKFxcXFxkezN9KSdcbiAgICAgIGNhc2UgJ0EnOlxuICAgICAgICBtYXAuQSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKEFNfFBNKSdcbiAgICAgIGNhc2UgJ2EnOlxuICAgICAgICBtYXAuYSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKGFtfHBtKSdcbiAgICAgIGNhc2UgJ2FhJzpcbiAgICAgICAgbWFwLmFhID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoYVxcXFwubVxcXFwufHBcXFxcLm1cXFxcLiknXG5cbiAgICAgIGNhc2UgJ2RkZCc6XG4gICAgICAgIHJldHVybiBkYXlzU2hvcnRcbiAgICAgIGNhc2UgJ2RkZGQnOlxuICAgICAgICByZXR1cm4gZGF5c1xuICAgICAgY2FzZSAnUSc6XG4gICAgICBjYXNlICdkJzpcbiAgICAgIGNhc2UgJ0UnOlxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxfSknXG4gICAgICBjYXNlICdRbyc6XG4gICAgICAgIHJldHVybiAnKDFzdHwybmR8M3JkfDR0aCknXG4gICAgICBjYXNlICdEREQnOlxuICAgICAgY2FzZSAnRERERCc6XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsM30pJ1xuICAgICAgY2FzZSAndyc6XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnd3cnOlxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG5cbiAgICAgIGNhc2UgJ1onOiAvLyB0byBzcGxpdDogKD86KFopKCkoKXwoWystXSk/KFxcXFxkezJ9KTo/KFxcXFxkezJ9KSlcbiAgICAgICAgbWFwLlogPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhafFsrLV1cXFxcZHsyfTpcXFxcZHsyfSknXG4gICAgICBjYXNlICdaWic6XG4gICAgICAgIG1hcC5aWiA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFp8WystXVxcXFxkezJ9XFxcXGR7Mn0pJ1xuXG4gICAgICBjYXNlICdYJzpcbiAgICAgICAgbWFwLlggPSBpbmRleFxuICAgICAgICByZXR1cm4gJygtP1xcXFxkKyknXG4gICAgICBjYXNlICd4JzpcbiAgICAgICAgbWFwLnggPSBpbmRleFxuICAgICAgICByZXR1cm4gJygtP1xcXFxkezQsfSknXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGluZGV4LS1cbiAgICAgICAgaWYgKG1hdGNoWyAwIF0gPT09ICdbJykge1xuICAgICAgICAgIG1hdGNoID0gbWF0Y2guc3Vic3RyaW5nKDEsIG1hdGNoLmxlbmd0aCAtIDEpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGNoLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJylcbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgcmVzID0geyBtYXAsIHJlZ2V4OiBuZXcgUmVnRXhwKCdeJyArIHJlZ2V4VGV4dCkgfVxuICByZWdleFN0b3JlWyBrZXkgXSA9IHJlc1xuXG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZUxvY2FsZSAocGFyYW1EYXRlTG9jYWxlLCBsYW5nUHJvcHMpIHtcbiAgcmV0dXJuIHBhcmFtRGF0ZUxvY2FsZSAhPT0gdm9pZCAwXG4gICAgPyBwYXJhbURhdGVMb2NhbGVcbiAgICA6IChcbiAgICAgICAgbGFuZ1Byb3BzICE9PSB2b2lkIDBcbiAgICAgICAgICA/IGxhbmdQcm9wcy5kYXRlXG4gICAgICAgICAgOiBkZWZhdWx0TGFuZy5kYXRlXG4gICAgICApXG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lIChvZmZzZXQsIGRlbGltZXRlciA9ICcnKSB7XG4gIGNvbnN0XG4gICAgc2lnbiA9IG9mZnNldCA+IDAgPyAnLScgOiAnKycsXG4gICAgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KSxcbiAgICBob3VycyA9IE1hdGguZmxvb3IoYWJzT2Zmc2V0IC8gNjApLFxuICAgIG1pbnV0ZXMgPSBhYnNPZmZzZXQgJSA2MFxuXG4gIHJldHVybiBzaWduICsgcGFkKGhvdXJzKSArIGRlbGltZXRlciArIHBhZChtaW51dGVzKVxufVxuXG5mdW5jdGlvbiBhcHBseVllYXJNb250aERheUNoYW5nZSAoZGF0ZSwgbW9kLCBzaWduKSB7XG4gIGxldFxuICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgbW9udGggPSBkYXRlLmdldE1vbnRoKClcblxuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuXG4gIGlmIChtb2QueWVhciAhPT0gdm9pZCAwKSB7XG4gICAgeWVhciArPSBzaWduICogbW9kLnllYXJcbiAgICBkZWxldGUgbW9kLnllYXJcbiAgfVxuXG4gIGlmIChtb2QubW9udGggIT09IHZvaWQgMCkge1xuICAgIG1vbnRoICs9IHNpZ24gKiBtb2QubW9udGhcbiAgICBkZWxldGUgbW9kLm1vbnRoXG4gIH1cblxuICBkYXRlLnNldERhdGUoMSlcbiAgZGF0ZS5zZXRNb250aCgyKVxuXG4gIGRhdGUuc2V0RnVsbFllYXIoeWVhcilcbiAgZGF0ZS5zZXRNb250aChtb250aClcbiAgZGF0ZS5zZXREYXRlKE1hdGgubWluKGRheSwgZGF5c0luTW9udGgoZGF0ZSkpKVxuXG4gIGlmIChtb2QuZGF0ZSAhPT0gdm9pZCAwKSB7XG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc2lnbiAqIG1vZC5kYXRlKVxuICAgIGRlbGV0ZSBtb2QuZGF0ZVxuICB9XG5cbiAgcmV0dXJuIGRhdGVcbn1cblxuZnVuY3Rpb24gYXBwbHlZZWFyTW9udGhEYXkgKGRhdGUsIG1vZCwgbWlkZGxlKSB7XG4gIGNvbnN0XG4gICAgeWVhciA9IG1vZC55ZWFyICE9PSB2b2lkIDAgPyBtb2QueWVhciA6IGRhdGVbIGBnZXQkeyBtaWRkbGUgfUZ1bGxZZWFyYCBdKCksXG4gICAgbW9udGggPSBtb2QubW9udGggIT09IHZvaWQgMCA/IG1vZC5tb250aCAtIDEgOiBkYXRlWyBgZ2V0JHsgbWlkZGxlIH1Nb250aGAgXSgpLFxuICAgIG1heERheSA9IChuZXcgRGF0ZSh5ZWFyLCBtb250aCArIDEsIDApKS5nZXREYXRlKCksXG4gICAgZGF5ID0gTWF0aC5taW4obWF4RGF5LCBtb2QuZGF0ZSAhPT0gdm9pZCAwID8gbW9kLmRhdGUgOiBkYXRlWyBgZ2V0JHsgbWlkZGxlIH1EYXRlYCBdKCkpXG5cbiAgZGF0ZVsgYHNldCR7IG1pZGRsZSB9RGF0ZWAgXSgxKVxuICBkYXRlWyBgc2V0JHsgbWlkZGxlIH1Nb250aGAgXSgyKVxuXG4gIGRhdGVbIGBzZXQkeyBtaWRkbGUgfUZ1bGxZZWFyYCBdKHllYXIpXG4gIGRhdGVbIGBzZXQkeyBtaWRkbGUgfU1vbnRoYCBdKG1vbnRoKVxuICBkYXRlWyBgc2V0JHsgbWlkZGxlIH1EYXRlYCBdKGRheSlcblxuICBkZWxldGUgbW9kLnllYXJcbiAgZGVsZXRlIG1vZC5tb250aFxuICBkZWxldGUgbW9kLmRhdGVcblxuICByZXR1cm4gZGF0ZVxufVxuXG5mdW5jdGlvbiBnZXRDaGFuZ2UgKGRhdGUsIHJhd01vZCwgc2lnbikge1xuICBjb25zdFxuICAgIG1vZCA9IG5vcm1hbGl6ZU1vZChyYXdNb2QpLFxuICAgIGQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICB0ID0gbW9kLnllYXIgIT09IHZvaWQgMCB8fCBtb2QubW9udGggIT09IHZvaWQgMCB8fCBtb2QuZGF0ZSAhPT0gdm9pZCAwXG4gICAgICA/IGFwcGx5WWVhck1vbnRoRGF5Q2hhbmdlKGQsIG1vZCwgc2lnbikgLy8gcmVtb3ZlcyB5ZWFyL21vbnRoL2RheVxuICAgICAgOiBkXG5cbiAgZm9yIChjb25zdCBrZXkgaW4gbW9kKSB7XG4gICAgY29uc3Qgb3AgPSBjYXBpdGFsaXplKGtleSlcbiAgICB0WyBgc2V0JHsgb3AgfWAgXSh0WyBgZ2V0JHsgb3AgfWAgXSgpICsgc2lnbiAqIG1vZFsga2V5IF0pXG4gIH1cblxuICByZXR1cm4gdFxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVNb2QgKG1vZCkge1xuICBjb25zdCBhY2MgPSB7IC4uLm1vZCB9XG5cbiAgaWYgKG1vZC55ZWFycyAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLnllYXIgPSBtb2QueWVhcnNcbiAgICBkZWxldGUgYWNjLnllYXJzXG4gIH1cblxuICBpZiAobW9kLm1vbnRocyAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLm1vbnRoID0gbW9kLm1vbnRoc1xuICAgIGRlbGV0ZSBhY2MubW9udGhzXG4gIH1cblxuICBpZiAobW9kLmRheXMgIT09IHZvaWQgMCkge1xuICAgIGFjYy5kYXRlID0gbW9kLmRheXNcbiAgICBkZWxldGUgYWNjLmRheXNcbiAgfVxuICBpZiAobW9kLmRheSAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLmRhdGUgPSBtb2QuZGF5XG4gICAgZGVsZXRlIGFjYy5kYXlcbiAgfVxuXG4gIGlmIChtb2QuaG91ciAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLmhvdXJzID0gbW9kLmhvdXJcbiAgICBkZWxldGUgYWNjLmhvdXJcbiAgfVxuXG4gIGlmIChtb2QubWludXRlICE9PSB2b2lkIDApIHtcbiAgICBhY2MubWludXRlcyA9IG1vZC5taW51dGVcbiAgICBkZWxldGUgYWNjLm1pbnV0ZVxuICB9XG5cbiAgaWYgKG1vZC5zZWNvbmQgIT09IHZvaWQgMCkge1xuICAgIGFjYy5zZWNvbmRzID0gbW9kLnNlY29uZFxuICAgIGRlbGV0ZSBhY2Muc2Vjb25kXG4gIH1cblxuICBpZiAobW9kLm1pbGxpc2Vjb25kICE9PSB2b2lkIDApIHtcbiAgICBhY2MubWlsbGlzZWNvbmRzID0gbW9kLm1pbGxpc2Vjb25kXG4gICAgZGVsZXRlIGFjYy5taWxsaXNlY29uZFxuICB9XG5cbiAgcmV0dXJuIGFjY1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRqdXN0RGF0ZSAoZGF0ZSwgcmF3TW9kLCB1dGMpIHtcbiAgY29uc3RcbiAgICBtb2QgPSBub3JtYWxpemVNb2QocmF3TW9kKSxcbiAgICBtaWRkbGUgPSB1dGMgPT09IHRydWUgPyAnVVRDJyA6ICcnLFxuICAgIGQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICB0ID0gbW9kLnllYXIgIT09IHZvaWQgMCB8fCBtb2QubW9udGggIT09IHZvaWQgMCB8fCBtb2QuZGF0ZSAhPT0gdm9pZCAwXG4gICAgICA/IGFwcGx5WWVhck1vbnRoRGF5KGQsIG1vZCwgbWlkZGxlKSAvLyByZW1vdmVzIHllYXIvbW9udGgvZGF5XG4gICAgICA6IGRcblxuICBmb3IgKGNvbnN0IGtleSBpbiBtb2QpIHtcbiAgICBjb25zdCBvcCA9IGtleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKVxuICAgIHRbIGBzZXQkeyBtaWRkbGUgfSR7IG9wIH1gIF0obW9kWyBrZXkgXSlcbiAgfVxuXG4gIHJldHVybiB0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0RGF0ZSAoc3RyLCBtYXNrLCBkYXRlTG9jYWxlKSB7XG4gIGNvbnN0IGQgPSBfX3NwbGl0RGF0ZShzdHIsIG1hc2ssIGRhdGVMb2NhbGUpXG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKFxuICAgIGQueWVhcixcbiAgICBkLm1vbnRoID09PSBudWxsID8gbnVsbCA6IGQubW9udGggLSAxLFxuICAgIGQuZGF5ID09PSBudWxsID8gMSA6IGQuZGF5LFxuICAgIGQuaG91cixcbiAgICBkLm1pbnV0ZSxcbiAgICBkLnNlY29uZCxcbiAgICBkLm1pbGxpc2Vjb25kXG4gIClcblxuICBjb25zdCB0ek9mZnNldCA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKVxuXG4gIHJldHVybiBkLnRpbWV6b25lT2Zmc2V0ID09PSBudWxsIHx8IGQudGltZXpvbmVPZmZzZXQgPT09IHR6T2Zmc2V0XG4gICAgPyBkYXRlXG4gICAgOiBnZXRDaGFuZ2UoZGF0ZSwgeyBtaW51dGVzOiBkLnRpbWV6b25lT2Zmc2V0IC0gdHpPZmZzZXQgfSwgMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3BsaXREYXRlIChzdHIsIG1hc2ssIGRhdGVMb2NhbGUsIGNhbGVuZGFyLCBkZWZhdWx0TW9kZWwpIHtcbiAgY29uc3QgZGF0ZSA9IHtcbiAgICB5ZWFyOiBudWxsLFxuICAgIG1vbnRoOiBudWxsLFxuICAgIGRheTogbnVsbCxcbiAgICBob3VyOiBudWxsLFxuICAgIG1pbnV0ZTogbnVsbCxcbiAgICBzZWNvbmQ6IG51bGwsXG4gICAgbWlsbGlzZWNvbmQ6IG51bGwsXG4gICAgdGltZXpvbmVPZmZzZXQ6IG51bGwsXG4gICAgZGF0ZUhhc2g6IG51bGwsXG4gICAgdGltZUhhc2g6IG51bGxcbiAgfVxuXG4gIGRlZmF1bHRNb2RlbCAhPT0gdm9pZCAwICYmIE9iamVjdC5hc3NpZ24oZGF0ZSwgZGVmYXVsdE1vZGVsKVxuXG4gIGlmIChcbiAgICBzdHIgPT09IHZvaWQgMFxuICAgIHx8IHN0ciA9PT0gbnVsbFxuICAgIHx8IHN0ciA9PT0gJydcbiAgICB8fCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJ1xuICApIHtcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgaWYgKG1hc2sgPT09IHZvaWQgMCkge1xuICAgIG1hc2sgPSBkZWZhdWx0TWFza1xuICB9XG5cbiAgY29uc3RcbiAgICBsYW5nT3B0cyA9IGdldERhdGVMb2NhbGUoZGF0ZUxvY2FsZSwgbGFuZy5wcm9wcyksXG4gICAgbW9udGhzID0gbGFuZ09wdHMubW9udGhzLFxuICAgIG1vbnRoc1Nob3J0ID0gbGFuZ09wdHMubW9udGhzU2hvcnRcblxuICBjb25zdCB7IHJlZ2V4LCBtYXAgfSA9IGdldFJlZ2V4RGF0YShtYXNrLCBsYW5nT3B0cylcblxuICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaChyZWdleClcblxuICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgbGV0IHR6U3RyaW5nID0gJydcblxuICBpZiAobWFwLlggIT09IHZvaWQgMCB8fCBtYXAueCAhPT0gdm9pZCAwKSB7XG4gICAgY29uc3Qgc3RhbXAgPSBwYXJzZUludChtYXRjaFsgbWFwLlggIT09IHZvaWQgMCA/IG1hcC5YIDogbWFwLnggXSwgMTApXG5cbiAgICBpZiAoaXNOYU4oc3RhbXApID09PSB0cnVlIHx8IHN0YW1wIDwgMCkge1xuICAgICAgcmV0dXJuIGRhdGVcbiAgICB9XG5cbiAgICBjb25zdCBkID0gbmV3IERhdGUoc3RhbXAgKiAobWFwLlggIT09IHZvaWQgMCA/IDEwMDAgOiAxKSlcblxuICAgIGRhdGUueWVhciA9IGQuZ2V0RnVsbFllYXIoKVxuICAgIGRhdGUubW9udGggPSBkLmdldE1vbnRoKCkgKyAxXG4gICAgZGF0ZS5kYXkgPSBkLmdldERhdGUoKVxuICAgIGRhdGUuaG91ciA9IGQuZ2V0SG91cnMoKVxuICAgIGRhdGUubWludXRlID0gZC5nZXRNaW51dGVzKClcbiAgICBkYXRlLnNlY29uZCA9IGQuZ2V0U2Vjb25kcygpXG4gICAgZGF0ZS5taWxsaXNlY29uZCA9IGQuZ2V0TWlsbGlzZWNvbmRzKClcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAobWFwLllZWVkgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS55ZWFyID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5ZWVlZIF0sIDEwKVxuICAgIH1cbiAgICBlbHNlIGlmIChtYXAuWVkgIT09IHZvaWQgMCkge1xuICAgICAgY29uc3QgeSA9IHBhcnNlSW50KG1hdGNoWyBtYXAuWVkgXSwgMTApXG4gICAgICBkYXRlLnllYXIgPSB5IDwgMCA/IHkgOiAyMDAwICsgeVxuICAgIH1cblxuICAgIGlmIChtYXAuTSAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLm1vbnRoID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5NIF0sIDEwKVxuICAgICAgaWYgKGRhdGUubW9udGggPCAxIHx8IGRhdGUubW9udGggPiAxMikge1xuICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChtYXAuTU1NICE9PSB2b2lkIDApIHtcbiAgICAgIGRhdGUubW9udGggPSBtb250aHNTaG9ydC5pbmRleE9mKG1hdGNoWyBtYXAuTU1NIF0pICsgMVxuICAgIH1cbiAgICBlbHNlIGlmIChtYXAuTU1NTSAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLm1vbnRoID0gbW9udGhzLmluZGV4T2YobWF0Y2hbIG1hcC5NTU1NIF0pICsgMVxuICAgIH1cblxuICAgIGlmIChtYXAuRCAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLmRheSA9IHBhcnNlSW50KG1hdGNoWyBtYXAuRCBdLCAxMClcblxuICAgICAgaWYgKGRhdGUueWVhciA9PT0gbnVsbCB8fCBkYXRlLm1vbnRoID09PSBudWxsIHx8IGRhdGUuZGF5IDwgMSkge1xuICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXhEYXkgPSBjYWxlbmRhciAhPT0gJ3BlcnNpYW4nXG4gICAgICAgID8gKG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgMCkpLmdldERhdGUoKVxuICAgICAgICA6IGphbGFhbGlNb250aExlbmd0aChkYXRlLnllYXIsIGRhdGUubW9udGgpXG5cbiAgICAgIGlmIChkYXRlLmRheSA+IG1heERheSkge1xuICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtYXAuSCAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLmhvdXIgPSBwYXJzZUludChtYXRjaFsgbWFwLkggXSwgMTApICUgMjRcbiAgICB9XG4gICAgZWxzZSBpZiAobWFwLmggIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5ob3VyID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5oIF0sIDEwKSAlIDEyXG4gICAgICBpZiAoXG4gICAgICAgIChtYXAuQSAmJiBtYXRjaFsgbWFwLkEgXSA9PT0gJ1BNJylcbiAgICAgICAgfHwgKG1hcC5hICYmIG1hdGNoWyBtYXAuYSBdID09PSAncG0nKVxuICAgICAgICB8fCAobWFwLmFhICYmIG1hdGNoWyBtYXAuYWEgXSA9PT0gJ3AubS4nKVxuICAgICAgKSB7XG4gICAgICAgIGRhdGUuaG91ciArPSAxMlxuICAgICAgfVxuICAgICAgZGF0ZS5ob3VyID0gZGF0ZS5ob3VyICUgMjRcbiAgICB9XG5cbiAgICBpZiAobWFwLm0gIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5taW51dGUgPSBwYXJzZUludChtYXRjaFsgbWFwLm0gXSwgMTApICUgNjBcbiAgICB9XG5cbiAgICBpZiAobWFwLnMgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5zZWNvbmQgPSBwYXJzZUludChtYXRjaFsgbWFwLnMgXSwgMTApICUgNjBcbiAgICB9XG5cbiAgICBpZiAobWFwLlMgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5taWxsaXNlY29uZCA9IHBhcnNlSW50KG1hdGNoWyBtYXAuUyBdLCAxMCkgKiAxMCAqKiAoMyAtIG1hdGNoWyBtYXAuUyBdLmxlbmd0aClcbiAgICB9XG5cbiAgICBpZiAobWFwLlogIT09IHZvaWQgMCB8fCBtYXAuWlogIT09IHZvaWQgMCkge1xuICAgICAgdHpTdHJpbmcgPSAobWFwLlogIT09IHZvaWQgMCA/IG1hdGNoWyBtYXAuWiBdLnJlcGxhY2UoJzonLCAnJykgOiBtYXRjaFsgbWFwLlpaIF0pXG4gICAgICBkYXRlLnRpbWV6b25lT2Zmc2V0ID0gKHR6U3RyaW5nWyAwIF0gPT09ICcrJyA/IC0xIDogMSkgKiAoNjAgKiB0elN0cmluZy5zbGljZSgxLCAzKSArIDEgKiB0elN0cmluZy5zbGljZSgzLCA1KSlcbiAgICB9XG4gIH1cblxuICBkYXRlLmRhdGVIYXNoID0gcGFkKGRhdGUueWVhciwgNikgKyAnLycgKyBwYWQoZGF0ZS5tb250aCkgKyAnLycgKyBwYWQoZGF0ZS5kYXkpXG4gIGRhdGUudGltZUhhc2ggPSBwYWQoZGF0ZS5ob3VyKSArICc6JyArIHBhZChkYXRlLm1pbnV0ZSkgKyAnOicgKyBwYWQoZGF0ZS5zZWNvbmQpICsgdHpTdHJpbmdcblxuICByZXR1cm4gZGF0ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZCAoZGF0ZSkge1xuICByZXR1cm4gdHlwZW9mIGRhdGUgPT09ICdudW1iZXInXG4gICAgPyB0cnVlXG4gICAgOiBpc05hTihEYXRlLnBhcnNlKGRhdGUpKSA9PT0gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGF0ZSAobW9kLCB1dGMpIHtcbiAgcmV0dXJuIGFkanVzdERhdGUobmV3IERhdGUoKSwgbW9kLCB1dGMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlPZldlZWsgKGRhdGUpIHtcbiAgY29uc3QgZG93ID0gbmV3IERhdGUoZGF0ZSkuZ2V0RGF5KClcbiAgcmV0dXJuIGRvdyA9PT0gMCA/IDcgOiBkb3dcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtPZlllYXIgKGRhdGUpIHtcbiAgLy8gUmVtb3ZlIHRpbWUgY29tcG9uZW50cyBvZiBkYXRlXG4gIGNvbnN0IHRodXJzZGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKVxuXG4gIC8vIENoYW5nZSBkYXRlIHRvIFRodXJzZGF5IHNhbWUgd2Vla1xuICB0aHVyc2RheS5zZXREYXRlKHRodXJzZGF5LmdldERhdGUoKSAtICgodGh1cnNkYXkuZ2V0RGF5KCkgKyA2KSAlIDcpICsgMylcblxuICAvLyBUYWtlIEphbnVhcnkgNHRoIGFzIGl0IGlzIGFsd2F5cyBpbiB3ZWVrIDEgKHNlZSBJU08gODYwMSlcbiAgY29uc3QgZmlyc3RUaHVyc2RheSA9IG5ldyBEYXRlKHRodXJzZGF5LmdldEZ1bGxZZWFyKCksIDAsIDQpXG5cbiAgLy8gQ2hhbmdlIGRhdGUgdG8gVGh1cnNkYXkgc2FtZSB3ZWVrXG4gIGZpcnN0VGh1cnNkYXkuc2V0RGF0ZShmaXJzdFRodXJzZGF5LmdldERhdGUoKSAtICgoZmlyc3RUaHVyc2RheS5nZXREYXkoKSArIDYpICUgNykgKyAzKVxuXG4gIC8vIENoZWNrIGlmIGRheWxpZ2h0LXNhdmluZy10aW1lLXN3aXRjaCBvY2N1cnJlZCBhbmQgY29ycmVjdCBmb3IgaXRcbiAgY29uc3QgZHMgPSB0aHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpIC0gZmlyc3RUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpXG4gIHRodXJzZGF5LnNldEhvdXJzKHRodXJzZGF5LmdldEhvdXJzKCkgLSBkcylcblxuICAvLyBOdW1iZXIgb2Ygd2Vla3MgYmV0d2VlbiB0YXJnZXQgVGh1cnNkYXkgYW5kIGZpcnN0IFRodXJzZGF5XG4gIGNvbnN0IHdlZWtEaWZmID0gKHRodXJzZGF5IC0gZmlyc3RUaHVyc2RheSkgLyAoTUlMTElTRUNPTkRTX0lOX0RBWSAqIDcpXG4gIHJldHVybiAxICsgTWF0aC5mbG9vcih3ZWVrRGlmZilcbn1cblxuZnVuY3Rpb24gZ2V0RGF5SWRlbnRpZmllciAoZGF0ZSkge1xuICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpICogMTAwMDAgKyBkYXRlLmdldE1vbnRoKCkgKiAxMDAgKyBkYXRlLmdldERhdGUoKVxufVxuXG5mdW5jdGlvbiBnZXREYXRlSWRlbnRpZmllciAoZGF0ZSwgb25seURhdGUgLyogPSBmYWxzZSAqLykge1xuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSlcbiAgcmV0dXJuIG9ubHlEYXRlID09PSB0cnVlID8gZ2V0RGF5SWRlbnRpZmllcihkKSA6IGQuZ2V0VGltZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JldHdlZW5EYXRlcyAoZGF0ZSwgZnJvbSwgdG8sIG9wdHMgPSB7fSkge1xuICBjb25zdFxuICAgIGQxID0gZ2V0RGF0ZUlkZW50aWZpZXIoZnJvbSwgb3B0cy5vbmx5RGF0ZSksXG4gICAgZDIgPSBnZXREYXRlSWRlbnRpZmllcih0bywgb3B0cy5vbmx5RGF0ZSksXG4gICAgY3VyID0gZ2V0RGF0ZUlkZW50aWZpZXIoZGF0ZSwgb3B0cy5vbmx5RGF0ZSlcblxuICByZXR1cm4gKGN1ciA+IGQxIHx8IChvcHRzLmluY2x1c2l2ZUZyb20gPT09IHRydWUgJiYgY3VyID09PSBkMSkpXG4gICAgJiYgKGN1ciA8IGQyIHx8IChvcHRzLmluY2x1c2l2ZVRvID09PSB0cnVlICYmIGN1ciA9PT0gZDIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9EYXRlIChkYXRlLCBtb2QpIHtcbiAgcmV0dXJuIGdldENoYW5nZShkYXRlLCBtb2QsIDEpXG59XG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3RGcm9tRGF0ZSAoZGF0ZSwgbW9kKSB7XG4gIHJldHVybiBnZXRDaGFuZ2UoZGF0ZSwgbW9kLCAtMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZEYXRlIChkYXRlLCB1bml0LCB1dGMpIHtcbiAgY29uc3RcbiAgICB0ID0gbmV3IERhdGUoZGF0ZSksXG4gICAgcHJlZml4ID0gYHNldCR7IHV0YyA9PT0gdHJ1ZSA/ICdVVEMnIDogJycgfWBcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Nb250aGAgXSgwKVxuICAgIGNhc2UgJ21vbnRoJzpcbiAgICBjYXNlICdtb250aHMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9RGF0ZWAgXSgxKVxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Ib3Vyc2AgXSgwKVxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfU1pbnV0ZXNgIF0oMClcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9U2Vjb25kc2AgXSgwKVxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1NaWxsaXNlY29uZHNgIF0oMClcbiAgfVxuICByZXR1cm4gdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5kT2ZEYXRlIChkYXRlLCB1bml0LCB1dGMpIHtcbiAgY29uc3RcbiAgICB0ID0gbmV3IERhdGUoZGF0ZSksXG4gICAgcHJlZml4ID0gYHNldCR7IHV0YyA9PT0gdHJ1ZSA/ICdVVEMnIDogJycgfWBcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Nb250aGAgXSgxMSlcbiAgICBjYXNlICdtb250aCc6XG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfURhdGVgIF0oZGF5c0luTW9udGgodCkpXG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXRlJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfUhvdXJzYCBdKDIzKVxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfU1pbnV0ZXNgIF0oNTkpXG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfVNlY29uZHNgIF0oNTkpXG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfU1pbGxpc2Vjb25kc2AgXSg5OTkpXG4gIH1cbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1heERhdGUgKGRhdGUgLyogLCAuLi5hcmdzICovKSB7XG4gIGxldCB0ID0gbmV3IERhdGUoZGF0ZSlcbiAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKS5mb3JFYWNoKGQgPT4ge1xuICAgIHQgPSBNYXRoLm1heCh0LCBuZXcgRGF0ZShkKSlcbiAgfSlcbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1pbkRhdGUgKGRhdGUgLyosIC4uLmFyZ3MgKi8pIHtcbiAgbGV0IHQgPSBuZXcgRGF0ZShkYXRlKVxuICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLmZvckVhY2goZCA9PiB7XG4gICAgdCA9IE1hdGgubWluKHQsIG5ldyBEYXRlKGQpKVxuICB9KVxuICByZXR1cm4gdFxufVxuXG5mdW5jdGlvbiBnZXREaWZmICh0LCBzdWIsIGludGVydmFsKSB7XG4gIHJldHVybiAoXG4gICAgKHQuZ2V0VGltZSgpIC0gdC5nZXRUaW1lem9uZU9mZnNldCgpICogTUlMTElTRUNPTkRTX0lOX01JTlVURSlcbiAgICAtIChzdWIuZ2V0VGltZSgpIC0gc3ViLmdldFRpbWV6b25lT2Zmc2V0KCkgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKVxuICApIC8gaW50ZXJ2YWxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGVEaWZmIChkYXRlLCBzdWJ0cmFjdCwgdW5pdCA9ICdkYXlzJykge1xuICBjb25zdFxuICAgIHQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICBzdWIgPSBuZXcgRGF0ZShzdWJ0cmFjdClcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgICByZXR1cm4gKHQuZ2V0RnVsbFllYXIoKSAtIHN1Yi5nZXRGdWxsWWVhcigpKVxuXG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICBjYXNlICdtb250aCc6XG4gICAgICByZXR1cm4gKHQuZ2V0RnVsbFllYXIoKSAtIHN1Yi5nZXRGdWxsWWVhcigpKSAqIDEyICsgdC5nZXRNb250aCgpIC0gc3ViLmdldE1vbnRoKClcblxuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICByZXR1cm4gZ2V0RGlmZihzdGFydE9mRGF0ZSh0LCAnZGF5JyksIHN0YXJ0T2ZEYXRlKHN1YiwgJ2RheScpLCBNSUxMSVNFQ09ORFNfSU5fREFZKVxuXG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgICAgcmV0dXJuIGdldERpZmYoc3RhcnRPZkRhdGUodCwgJ2hvdXInKSwgc3RhcnRPZkRhdGUoc3ViLCAnaG91cicpLCBNSUxMSVNFQ09ORFNfSU5fSE9VUilcblxuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICByZXR1cm4gZ2V0RGlmZihzdGFydE9mRGF0ZSh0LCAnbWludXRlJyksIHN0YXJ0T2ZEYXRlKHN1YiwgJ21pbnV0ZScpLCBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKVxuXG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgIHJldHVybiBnZXREaWZmKHN0YXJ0T2ZEYXRlKHQsICdzZWNvbmQnKSwgc3RhcnRPZkRhdGUoc3ViLCAnc2Vjb25kJyksIDEwMDApXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheU9mWWVhciAoZGF0ZSkge1xuICByZXR1cm4gZ2V0RGF0ZURpZmYoZGF0ZSwgc3RhcnRPZkRhdGUoZGF0ZSwgJ3llYXInKSwgJ2RheXMnKSArIDFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZmVyRGF0ZUZvcm1hdCAoZGF0ZSkge1xuICByZXR1cm4gaXNEYXRlKGRhdGUpID09PSB0cnVlXG4gICAgPyAnZGF0ZSdcbiAgICA6ICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicgPyAnbnVtYmVyJyA6ICdzdHJpbmcnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0ZUJldHdlZW4gKGRhdGUsIG1pbiwgbWF4KSB7XG4gIGNvbnN0IHQgPSBuZXcgRGF0ZShkYXRlKVxuXG4gIGlmIChtaW4pIHtcbiAgICBjb25zdCBsb3cgPSBuZXcgRGF0ZShtaW4pXG4gICAgaWYgKHQgPCBsb3cpIHtcbiAgICAgIHJldHVybiBsb3dcbiAgICB9XG4gIH1cblxuICBpZiAobWF4KSB7XG4gICAgY29uc3QgaGlnaCA9IG5ldyBEYXRlKG1heClcbiAgICBpZiAodCA+IGhpZ2gpIHtcbiAgICAgIHJldHVybiBoaWdoXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZURhdGUgKGRhdGUsIGRhdGUyLCB1bml0KSB7XG4gIGNvbnN0XG4gICAgdCA9IG5ldyBEYXRlKGRhdGUpLFxuICAgIGQgPSBuZXcgRGF0ZShkYXRlMilcblxuICBpZiAodW5pdCA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIHQuZ2V0VGltZSgpID09PSBkLmdldFRpbWUoKVxuICB9XG5cbiAgc3dpdGNoICh1bml0KSB7XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgIGlmICh0LmdldFNlY29uZHMoKSAhPT0gZC5nZXRTZWNvbmRzKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgY2FzZSAnbWludXRlJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgICBpZiAodC5nZXRNaW51dGVzKCkgIT09IGQuZ2V0TWludXRlcygpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIGNhc2UgJ2hvdXInOiAvLyBpbnRlbnRpb25hbCBmYWxsLXRocm91Z2hcbiAgICBjYXNlICdob3Vycyc6XG4gICAgICBpZiAodC5nZXRIb3VycygpICE9PSBkLmdldEhvdXJzKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgY2FzZSAnZGF5JzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICBpZiAodC5nZXREYXRlKCkgIT09IGQuZ2V0RGF0ZSgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIGNhc2UgJ21vbnRoJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICAgIGlmICh0LmdldE1vbnRoKCkgIT09IGQuZ2V0TW9udGgoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICBjYXNlICd5ZWFyJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAneWVhcnMnOlxuICAgICAgaWYgKHQuZ2V0RnVsbFllYXIoKSAhPT0gZC5nZXRGdWxsWWVhcigpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBkYXRlIGlzU2FtZURhdGUgdW5rbm93biB1bml0ICR7IHVuaXQgfWApXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGF5c0luTW9udGggKGRhdGUpIHtcbiAgcmV0dXJuIChuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSArIDEsIDApKS5nZXREYXRlKClcbn1cblxuZnVuY3Rpb24gZ2V0T3JkaW5hbCAobikge1xuICBpZiAobiA+PSAxMSAmJiBuIDw9IDEzKSB7XG4gICAgcmV0dXJuIGAkeyBuIH10aGBcbiAgfVxuICBzd2l0Y2ggKG4gJSAxMCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGAkeyBuIH1zdGBcbiAgICBjYXNlIDI6IHJldHVybiBgJHsgbiB9bmRgXG4gICAgY2FzZSAzOiByZXR1cm4gYCR7IG4gfXJkYFxuICB9XG4gIHJldHVybiBgJHsgbiB9dGhgXG59XG5cbmNvbnN0IGZvcm1hdHRlciA9IHtcbiAgLy8gWWVhcjogMDAsIDAxLCAuLi4sIDk5XG4gIFlZIChkYXRlLCBkYXRlTG9jYWxlLCBmb3JjZWRZZWFyKSB7XG4gICAgLy8gd29ya2Fyb3VuZCBmb3IgPCAxOTAwIHdpdGggbmV3IERhdGUoKVxuICAgIGNvbnN0IHkgPSB0aGlzLllZWVkoZGF0ZSwgZGF0ZUxvY2FsZSwgZm9yY2VkWWVhcikgJSAxMDBcbiAgICByZXR1cm4geSA+PSAwXG4gICAgICA/IHBhZCh5KVxuICAgICAgOiAnLScgKyBwYWQoTWF0aC5hYnMoeSkpXG4gIH0sXG5cbiAgLy8gWWVhcjogMTkwMCwgMTkwMSwgLi4uLCAyMDk5XG4gIFlZWVkgKGRhdGUsIF9kYXRlTG9jYWxlLCBmb3JjZWRZZWFyKSB7XG4gICAgLy8gd29ya2Fyb3VuZCBmb3IgPCAxOTAwIHdpdGggbmV3IERhdGUoKVxuICAgIHJldHVybiBmb3JjZWRZZWFyICE9PSB2b2lkIDAgJiYgZm9yY2VkWWVhciAhPT0gbnVsbFxuICAgICAgPyBmb3JjZWRZZWFyXG4gICAgICA6IGRhdGUuZ2V0RnVsbFllYXIoKVxuICB9LFxuXG4gIC8vIE1vbnRoOiAxLCAyLCAuLi4sIDEyXG4gIE0gKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpICsgMVxuICB9LFxuXG4gIC8vIE1vbnRoOiAwMSwgMDIsIC4uLiwgMTJcbiAgTU0gKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0TW9udGgoKSArIDEpXG4gIH0sXG5cbiAgLy8gTW9udGggU2hvcnQgTmFtZTogSmFuLCBGZWIsIC4uLlxuICBNTU0gKGRhdGUsIGRhdGVMb2NhbGUpIHtcbiAgICByZXR1cm4gZGF0ZUxvY2FsZS5tb250aHNTaG9ydFsgZGF0ZS5nZXRNb250aCgpIF1cbiAgfSxcblxuICAvLyBNb250aCBOYW1lOiBKYW51YXJ5LCBGZWJydWFyeSwgLi4uXG4gIE1NTU0gKGRhdGUsIGRhdGVMb2NhbGUpIHtcbiAgICByZXR1cm4gZGF0ZUxvY2FsZS5tb250aHNbIGRhdGUuZ2V0TW9udGgoKSBdXG4gIH0sXG5cbiAgLy8gUXVhcnRlcjogMSwgMiwgMywgNFxuICBRIChkYXRlKSB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCgoZGF0ZS5nZXRNb250aCgpICsgMSkgLyAzKVxuICB9LFxuXG4gIC8vIFF1YXJ0ZXI6IDFzdCwgMm5kLCAzcmQsIDR0aFxuICBRbyAoZGF0ZSkge1xuICAgIHJldHVybiBnZXRPcmRpbmFsKHRoaXMuUShkYXRlKSlcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDEsIDIsIC4uLiwgMzFcbiAgRCAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERhdGUoKVxuICB9LFxuXG4gIC8vIERheSBvZiBtb250aDogMXN0LCAybmQsIC4uLiwgMzFzdFxuICBEbyAoZGF0ZSkge1xuICAgIHJldHVybiBnZXRPcmRpbmFsKGRhdGUuZ2V0RGF0ZSgpKVxuICB9LFxuXG4gIC8vIERheSBvZiBtb250aDogMDEsIDAyLCAuLi4sIDMxXG4gIEREIChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChkYXRlLmdldERhdGUoKSlcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMSwgMiwgLi4uLCAzNjZcbiAgREREIChkYXRlKSB7XG4gICAgcmV0dXJuIGdldERheU9mWWVhcihkYXRlKVxuICB9LFxuXG4gIC8vIERheSBvZiB5ZWFyOiAwMDEsIDAwMiwgLi4uLCAzNjZcbiAgRERERCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZ2V0RGF5T2ZZZWFyKGRhdGUpLCAzKVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiAwLCAxLCAuLi4sIDZcbiAgZCAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERheSgpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHdlZWs6IFN1LCBNbywgLi4uXG4gIGRkIChkYXRlLCBkYXRlTG9jYWxlKSB7XG4gICAgcmV0dXJuIHRoaXMuZGRkZChkYXRlLCBkYXRlTG9jYWxlKS5zbGljZSgwLCAyKVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiBTdW4sIE1vbiwgLi4uXG4gIGRkZCAoZGF0ZSwgZGF0ZUxvY2FsZSkge1xuICAgIHJldHVybiBkYXRlTG9jYWxlLmRheXNTaG9ydFsgZGF0ZS5nZXREYXkoKSBdXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHdlZWs6IFN1bmRheSwgTW9uZGF5LCAuLi5cbiAgZGRkZCAoZGF0ZSwgZGF0ZUxvY2FsZSkge1xuICAgIHJldHVybiBkYXRlTG9jYWxlLmRheXNbIGRhdGUuZ2V0RGF5KCkgXVxuICB9LFxuXG4gIC8vIERheSBvZiBJU08gd2VlazogMSwgMiwgLi4uLCA3XG4gIEUgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXkoKSB8fCA3XG4gIH0sXG5cbiAgLy8gV2VlayBvZiBZZWFyOiAxIDIgLi4uIDUyIDUzXG4gIHcgKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0V2Vla09mWWVhcihkYXRlKVxuICB9LFxuXG4gIC8vIFdlZWsgb2YgWWVhcjogMDEgMDIgLi4uIDUyIDUzXG4gIHd3IChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChnZXRXZWVrT2ZZZWFyKGRhdGUpKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAsIDEsIC4uLiAyM1xuICBIIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAwLCAwMSwgLi4uLCAyM1xuICBISCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZGF0ZS5nZXRIb3VycygpKVxuICB9LFxuXG4gIC8vIEhvdXI6IDEsIDIsIC4uLiwgMTJcbiAgaCAoZGF0ZSkge1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpXG4gICAgcmV0dXJuIGhvdXJzID09PSAwXG4gICAgICA/IDEyXG4gICAgICA6IChob3VycyA+IDEyID8gaG91cnMgJSAxMiA6IGhvdXJzKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAxLCAwMiwgLi4uLCAxMlxuICBoaCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQodGhpcy5oKGRhdGUpKVxuICB9LFxuXG4gIC8vIE1pbnV0ZTogMCwgMSwgLi4uLCA1OVxuICBtIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpXG4gIH0sXG5cbiAgLy8gTWludXRlOiAwMCwgMDEsIC4uLiwgNTlcbiAgbW0gKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0TWludXRlcygpKVxuICB9LFxuXG4gIC8vIFNlY29uZDogMCwgMSwgLi4uLCA1OVxuICBzIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpXG4gIH0sXG5cbiAgLy8gU2Vjb25kOiAwMCwgMDEsIC4uLiwgNTlcbiAgc3MgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0U2Vjb25kcygpKVxuICB9LFxuXG4gIC8vIDEvMTAgb2Ygc2Vjb25kOiAwLCAxLCAuLi4sIDlcbiAgUyAoZGF0ZSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDApXG4gIH0sXG5cbiAgLy8gMS8xMDAgb2Ygc2Vjb25kOiAwMCwgMDEsIC4uLiwgOTlcbiAgU1MgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKE1hdGguZmxvb3IoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwKSlcbiAgfSxcblxuICAvLyBNaWxsaXNlY29uZDogMDAwLCAwMDEsIC4uLiwgOTk5XG4gIFNTUyAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSwgMylcbiAgfSxcblxuICAvLyBNZXJpZGllbTogQU0sIFBNXG4gIEEgKGRhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5IKGRhdGUpIDwgMTIgPyAnQU0nIDogJ1BNJ1xuICB9LFxuXG4gIC8vIE1lcmlkaWVtOiBhbSwgcG1cbiAgYSAoZGF0ZSkge1xuICAgIHJldHVybiB0aGlzLkgoZGF0ZSkgPCAxMiA/ICdhbScgOiAncG0nXG4gIH0sXG5cbiAgLy8gTWVyaWRpZW06IGEubS4sIHAubS5cbiAgYWEgKGRhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5IKGRhdGUpIDwgMTIgPyAnYS5tLicgOiAncC5tLidcbiAgfSxcblxuICAvLyBUaW1lem9uZTogLTAxOjAwLCArMDA6MDAsIC4uLiArMTI6MDBcbiAgWiAoZGF0ZSwgX2RhdGVMb2NhbGUsIF9mb3JjZWRZZWFyLCBmb3JjZWRUaW1lem9uZU9mZnNldCkge1xuICAgIGNvbnN0IHR6T2Zmc2V0ID0gZm9yY2VkVGltZXpvbmVPZmZzZXQgPT09IHZvaWQgMCB8fCBmb3JjZWRUaW1lem9uZU9mZnNldCA9PT0gbnVsbFxuICAgICAgPyBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KClcbiAgICAgIDogZm9yY2VkVGltZXpvbmVPZmZzZXRcblxuICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0ek9mZnNldCwgJzonKVxuICB9LFxuXG4gIC8vIFRpbWV6b25lOiAtMDEwMCwgKzAwMDAsIC4uLiArMTIwMFxuICBaWiAoZGF0ZSwgX2RhdGVMb2NhbGUsIF9mb3JjZWRZZWFyLCBmb3JjZWRUaW1lem9uZU9mZnNldCkge1xuICAgIGNvbnN0IHR6T2Zmc2V0ID0gZm9yY2VkVGltZXpvbmVPZmZzZXQgPT09IHZvaWQgMCB8fCBmb3JjZWRUaW1lem9uZU9mZnNldCA9PT0gbnVsbFxuICAgICAgPyBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KClcbiAgICAgIDogZm9yY2VkVGltZXpvbmVPZmZzZXRcblxuICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0ek9mZnNldClcbiAgfSxcblxuICAvLyBTZWNvbmRzIHRpbWVzdGFtcDogNTEyOTY5NTIwXG4gIFggKGRhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihkYXRlLmdldFRpbWUoKSAvIDEwMDApXG4gIH0sXG5cbiAgLy8gTWlsbGlzZWNvbmRzIHRpbWVzdGFtcDogNTEyOTY5NTIwOTAwXG4gIHggKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRUaW1lKClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZSAodmFsLCBtYXNrLCBkYXRlTG9jYWxlLCBfX2ZvcmNlZFllYXIsIF9fZm9yY2VkVGltZXpvbmVPZmZzZXQpIHtcbiAgaWYgKFxuICAgICh2YWwgIT09IDAgJiYgIXZhbClcbiAgICB8fCB2YWwgPT09IEluZmluaXR5XG4gICAgfHwgdmFsID09PSAtSW5maW5pdHlcbiAgKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUodmFsKVxuXG4gIGlmIChpc05hTihkYXRlKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKG1hc2sgPT09IHZvaWQgMCkge1xuICAgIG1hc2sgPSBkZWZhdWx0TWFza1xuICB9XG5cbiAgY29uc3QgbG9jYWxlID0gZ2V0RGF0ZUxvY2FsZShkYXRlTG9jYWxlLCBsYW5nLnByb3BzKVxuXG4gIHJldHVybiBtYXNrLnJlcGxhY2UoXG4gICAgdG9rZW4sXG4gICAgKG1hdGNoLCB0ZXh0KSA9PiAoXG4gICAgICBtYXRjaCBpbiBmb3JtYXR0ZXJcbiAgICAgICAgPyBmb3JtYXR0ZXJbIG1hdGNoIF0oZGF0ZSwgbG9jYWxlLCBfX2ZvcmNlZFllYXIsIF9fZm9yY2VkVGltZXpvbmVPZmZzZXQpXG4gICAgICAgIDogKHRleHQgPT09IHZvaWQgMCA/IG1hdGNoIDogdGV4dC5zcGxpdCgnXFxcXF0nKS5qb2luKCddJykpXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZSAoZGF0ZSkge1xuICByZXR1cm4gaXNEYXRlKGRhdGUpID09PSB0cnVlXG4gICAgPyBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSlcbiAgICA6IGRhdGVcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc1ZhbGlkLFxuICBleHRyYWN0RGF0ZSxcbiAgYnVpbGREYXRlLFxuICBnZXREYXlPZldlZWssXG4gIGdldFdlZWtPZlllYXIsXG4gIGlzQmV0d2VlbkRhdGVzLFxuICBhZGRUb0RhdGUsXG4gIHN1YnRyYWN0RnJvbURhdGUsXG4gIGFkanVzdERhdGUsXG4gIHN0YXJ0T2ZEYXRlLFxuICBlbmRPZkRhdGUsXG4gIGdldE1heERhdGUsXG4gIGdldE1pbkRhdGUsXG4gIGdldERhdGVEaWZmLFxuICBnZXREYXlPZlllYXIsXG4gIGluZmVyRGF0ZUZvcm1hdCxcbiAgZ2V0RGF0ZUJldHdlZW4sXG4gIGlzU2FtZURhdGUsXG4gIGRheXNJbk1vbnRoLFxuICBmb3JtYXREYXRlLFxuICBjbG9uZVxufVxuIiwiPHRlbXBsYXRlPlxuICA8cS1sYXlvdXQgdmlldz1cImxIaCBMcHIgbEZmXCI+XG4gICAgPHEtaGVhZGVyPlxuICAgICAgPHEtdG9vbGJhcj5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgcm91bmRcbiAgICAgICAgICBpY29uPVwibWVudVwiXG4gICAgICAgICAgYXJpYS1sYWJlbD1cIk1lbnVcIlxuICAgICAgICAgIEBjbGljaz1cInRvZ2dsZUxlZnREcmF3ZXJcIlxuICAgICAgICAvPlxuXG5cbiAgICAgIDwvcS10b29sYmFyPlxuICAgICAgPGRpdiBjbGFzcz1cInEtcHgtbGcgcS1wdC14bCBxLW1iLW1kXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWgzXCI+VGFza3M8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGVsXCI+e3sgdG9kYXlzRGF0ZSB9fTwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG5cbiAgICA8L3EtaGVhZGVyPlxuXG5cbjxxLWRyYXdlclxuICAgICAgICB2LW1vZGVsPVwibGVmdERyYXdlck9wZW5cIlxuICAgICAgICBzaG93LWlmLWFib3ZlXG4gICAgICAgIDp3aWR0aD1cIjI1MFwiXG4gICAgICAgIDpicmVha3BvaW50PVwiNjAwXCJcbiAgICAgID5cbiAgICAgICAgPHEtc2Nyb2xsLWFyZWEgc3R5bGU9XCJoZWlnaHQ6IGNhbGMoMTAwJSAtIDE1MHB4KTsgbWFyZ2luLXRvcDogMTUwcHg7IGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNkZGRcIj5cbiAgICAgICAgICA8cS1saXN0IHBhZGRpbmc+XG4gICAgICAgICAgICA8cS1pdGVtXG4gICAgICAgICAgICB0bz1cIi9cIlxuICAgICAgICAgICAgY2xpY2thYmxlXG4gICAgICAgICAgICB2LXJpcHBsZT5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJMaXN0XCIgLz5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgTGlzdFxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPC9xLWl0ZW0+XG5cbiAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgIHRvPVwiL2hlbHBcIlxuICAgICAgICAgICAgZXhhY3RcbiAgICAgICAgICAgICBjbGlja2FibGVcbiAgICAgICAgICAgICB2LXJpcHBsZT5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJoZWxwXCIgLz5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgaGVscFxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPC9xLWl0ZW0+XG5cblxuICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICA8L3Etc2Nyb2xsLWFyZWE+XG5cbiAgICAgICAgPHEtaW1nIGNsYXNzPVwiYWJzb2x1dGUtdG9wXCIgc3JjPVwiaHR0cHM6Ly80LmJwLmJsb2dzcG90LmNvbS8tbmg3dDNlN3lDMVUvVnMzQkpRS3F2OUkvQUFBQUFBQUFBbGsvRnVqcGVrYXZDazAvdzEyMDAtaDYzMC1wLWstbm8tbnUvaW5zcGlyYSUyNUMzJTI1QTclMjVDMyUyNUEzbzE2LmpwZ1wiIHN0eWxlPVwiaGVpZ2h0OiAxNTBweFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhYnNvbHV0ZS1ib3R0b20gYmctdHJhbnNwYXJlbnRcIj5cbiAgICAgICAgICAgIDxxLWF2YXRhciBzaXplPVwiNTZweFwiIGNsYXNzPVwicS1tYi1zbVwiPlxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImlwLmpwZ1wiPlxuICAgICAgICAgICAgPC9xLWF2YXRhcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1ib2xkXCIgPkNpbmR5IFphY2FyaWFzPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PkBDaW5keV9aYWNhcmlhczwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtaW1nPlxuICAgICAgPC9xLWRyYXdlcj5cblxuICAgIDxxLXBhZ2UtY29udGFpbmVyPlxuICAgICAgPEtlZXBBbGl2ZT5cbiAgICAgICAgPHJvdXRlci12aWV3IC8+XG4gICAgICA8L0tlZXBBbGl2ZT5cblxuICAgIDwvcS1wYWdlLWNvbnRhaW5lcj5cbiAgPC9xLWxheW91dD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cbmltcG9ydCB7IGRlZmluZUNvbXBvbmVudCwgcmVmIH0gZnJvbSAndnVlJ1xuaW1wb3J0IEVzc2VudGlhbExpbmsgZnJvbSAnY29tcG9uZW50cy9Fc3NlbnRpYWxMaW5rLnZ1ZSdcbmltcG9ydCB7IGRhdGUgfSBmcm9tICdxdWFzYXInXG5cbmNvbnN0IGxpbmtzTGlzdCA9IFtcbiAge1xuICAgIHRpdGxlOiAnRG9jcycsXG4gICAgY2FwdGlvbjogJ3F1YXNhci5kZXYnLFxuICAgIGljb246ICdzY2hvb2wnLFxuICAgIGxpbms6ICdodHRwczovL3F1YXNhci5kZXYnXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogJ0dpdGh1YicsXG4gICAgY2FwdGlvbjogJ2dpdGh1Yi5jb20vcXVhc2FyZnJhbWV3b3JrJyxcbiAgICBpY29uOiAnY29kZScsXG4gICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9xdWFzYXJmcmFtZXdvcmsnXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogJ0Rpc2NvcmQgQ2hhdCBDaGFubmVsJyxcbiAgICBjYXB0aW9uOiAnY2hhdC5xdWFzYXIuZGV2JyxcbiAgICBpY29uOiAnY2hhdCcsXG4gICAgbGluazogJ2h0dHBzOi8vY2hhdC5xdWFzYXIuZGV2J1xuICB9LFxuICB7XG4gICAgdGl0bGU6ICdGb3J1bScsXG4gICAgY2FwdGlvbjogJ2ZvcnVtLnF1YXNhci5kZXYnLFxuICAgIGljb246ICdyZWNvcmRfdm9pY2Vfb3ZlcicsXG4gICAgbGluazogJ2h0dHBzOi8vZm9ydW0ucXVhc2FyLmRldidcbiAgfSxcbiAge1xuICAgIHRpdGxlOiAnVHdpdHRlcicsXG4gICAgY2FwdGlvbjogJ0BxdWFzYXJmcmFtZXdvcmsnLFxuICAgIGljb246ICdyc3NfZmVlZCcsXG4gICAgbGluazogJ2h0dHBzOi8vdHdpdHRlci5xdWFzYXIuZGV2J1xuICB9LFxuICB7XG4gICAgdGl0bGU6ICdGYWNlYm9vaycsXG4gICAgY2FwdGlvbjogJ0BRdWFzYXJGcmFtZXdvcmsnLFxuICAgIGljb246ICdwdWJsaWMnLFxuICAgIGxpbms6ICdodHRwczovL2ZhY2Vib29rLnF1YXNhci5kZXYnXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogJ1F1YXNhciBBd2Vzb21lJyxcbiAgICBjYXB0aW9uOiAnQ29tbXVuaXR5IFF1YXNhciBwcm9qZWN0cycsXG4gICAgaWNvbjogJ2Zhdm9yaXRlJyxcbiAgICBsaW5rOiAnaHR0cHM6Ly9hd2Vzb21lLnF1YXNhci5kZXYnXG4gIH1cbl1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ01haW5MYXlvdXQnLFxuXG4gIGNvbXBvbmVudHM6IHtcbiAgICBFc3NlbnRpYWxMaW5rXG4gIH0sXG5cbiAgc2V0dXAgKCkge1xuICAgIGNvbnN0IGxlZnREcmF3ZXJPcGVuID0gcmVmKGZhbHNlKVxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgZXNzZW50aWFsTGlua3M6IGxpbmtzTGlzdCxcbiAgICAgIGxlZnREcmF3ZXJPcGVuLFxuICAgICAgdG9nZ2xlTGVmdERyYXdlciAoKSB7XG4gICAgICAgIGxlZnREcmF3ZXJPcGVuLnZhbHVlID0gIWxlZnREcmF3ZXJPcGVuLnZhbHVlXG4gICAgICB9XG4gICAgfVxuXG5cblxufSxcbmNvbXB1dGVkOntcbiAgICAgIHRvZGF5c0RhdGUoKXtcbiAgICAgICAgY29uc3QgdGltZVN0YW1wID0gRGF0ZS5ub3coKVxuICAgICAgICAgcmV0dXJuIGRhdGUuZm9ybWF0RGF0ZSh0aW1lU3RhbXAsICdkZGRkIEQgTU1NTScpXG4gICAgICB9XG4gICAgfVxuXG5cbn0pXG5cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5kaXZ7XG4gIGNvbG9yOiBibGFjaztcblxufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJzdG9wIiwib2Zmc2V0IiwibW9kIiwidmFsdWUiLCJjbG9uZSIsImR1cmF0aW9uIiwicG9zaXRpb24iLCJzdHlsZSIsInNpemUiLCJoZWlnaHQiLCJ3aWR0aCIsIl9zZmNfbWFpbiIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVWTm9kZSIsImRhdGUiLCJsYW5nIiwiZGF0ZTIiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl9LZWVwQWxpdmUiXSwibWFwcGluZ3MiOiI7O0FBS0EsSUFBQSxXQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLE9BQU87QUFBQSxFQUNSO0FBQUEsRUFFRCxNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIsd0NBQ0csTUFBTSxVQUFVLE9BQU8sc0JBQXNCO0FBQUEsSUFDakQ7QUFFRCxXQUFPLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxRQUFRLE9BQU8sTUFBTSxVQUFTLEdBQUksTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUFBLEVBQ3RGO0FBQ0gsQ0FBQztBQ2ZjLFNBQUEsZUFB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QUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksS0FBSztBQUNULGVBQU87QUFBQSxXQUVKO0FBQ0gsZUFBTztBQUFBLFdBQ0o7QUFDSCxlQUFPO0FBQUEsV0FDSjtBQUFBLFdBQ0E7QUFBQSxXQUNBO0FBQ0gsZUFBTztBQUFBLFdBQ0o7QUFDSCxlQUFPO0FBQUEsV0FDSjtBQUFBLFdBQ0E7QUFDSCxlQUFPO0FBQUEsV0FDSjtBQUNILGVBQU87QUFBQSxXQUNKO0FBQ0gsZUFBTztBQUFBLFdBRUo7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksS0FBSztBQUNULGVBQU87QUFBQSxXQUVKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUE7QUFHUDtB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
