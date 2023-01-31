import { a1 as _export_sfc, a2 as openBlock, a3 as createBlock, a4 as withCtx, af as createBaseVNode, a5 as createVNode, ae as QBtn, am as withKeys, an as QInput, ao as createElementBlock, ap as renderList, aq as Fragment, a6 as QIcon, a7 as createCommentVNode, K as withDirectives, ar as normalizeClass, as as QCheckbox, a8 as createTextVNode, a9 as toDisplayString, at as withModifiers, ai as Ripple } from "./index.787b6272.js";
import { c as QList, b as QItem, Q as QItemSection, a as QItemLabel } from "./QItemLabel.33c28489.js";
import { Q as QPage } from "./QPage.af74e8e0.js";
var List_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  data() {
    return {
      newTask: "",
      tasks: []
    };
  },
  methods: {
    deleteTask(index) {
      this.$q.dialog({
        title: "Confirm",
        message: "Are you sure?",
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.tasks.splice(index, 1);
        this.$q.notify("Task deleted");
      });
    },
    addTask() {
      this.tasks.push({
        title: this.newTask,
        done: false
      });
      this.newTask = "";
    }
  }
};
const _hoisted_1 = { class: "row q-pa-sm bg-primary" };
const _hoisted_2 = {
  key: 0,
  class: "no-tasks absolute-center"
};
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 text-primary text-center" }, " No tasks ", -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "bg-grey-3 column" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createVNode(QInput, {
          modelValue: $data.newTask,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.newTask = $event),
          onKeyup: withKeys($options.addTask, ["enter"]),
          class: "col",
          square: "",
          filled: "",
          "bg-color": "white",
          placeholder: "Add task",
          dense: ""
        }, {
          append: withCtx(() => [
            createVNode(QBtn, {
              onClick: _cache[0] || (_cache[0] = ($event) => $options.addTask()),
              round: "",
              dense: "",
              flat: "",
              icon: "add"
            })
          ]),
          _: 1
        }, 8, ["modelValue", "onKeyup"])
      ]),
      createVNode(QList, {
        class: "bg-white",
        separator: "",
        bordered: ""
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($data.tasks, (task, index) => {
            return withDirectives((openBlock(), createBlock(QItem, {
              key: task.title,
              onClick: ($event) => task.done = !task.done,
              class: normalizeClass({ "done bg-blue-1": task.done }),
              clickable: ""
            }, {
              default: withCtx(() => [
                createVNode(QItemSection, { avatar: "" }, {
                  default: withCtx(() => [
                    createVNode(QCheckbox, {
                      modelValue: task.done,
                      "onUpdate:modelValue": ($event) => task.done = $event,
                      class: "no-pointer-events",
                      color: "primary"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 2
                }, 1024),
                createVNode(QItemSection, null, {
                  default: withCtx(() => [
                    createVNode(QItemLabel, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(task.title), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                task.done ? (openBlock(), createBlock(QItemSection, {
                  key: 0,
                  side: ""
                }, {
                  default: withCtx(() => [
                    createVNode(QBtn, {
                      onClick: withModifiers(($event) => $options.deleteTask(index), ["stop"]),
                      flat: "",
                      round: "",
                      color: "primary",
                      icon: "delete"
                    }, null, 8, ["onClick"])
                  ]),
                  _: 2
                }, 1024)) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1032, ["onClick", "class"])), [
              [Ripple]
            ]);
          }), 128))
        ]),
        _: 1
      }),
      !$data.tasks.length ? (openBlock(), createElementBlock("div", _hoisted_2, [
        createVNode(QIcon, {
          name: "check",
          size: "100px",
          color: "primary"
        }),
        _hoisted_3
      ])) : createCommentVNode("", true)
    ]),
    _: 1
  });
}
var List = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "List.vue"]]);
export { List as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5lYTNmNjE0OS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL0xpc3QudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cImJnLWdyZXktMyBjb2x1bW4gXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvdyBxLXBhLXNtIGJnLXByaW1hcnlcIj5cbiAgICA8cS1pbnB1dFxuICAgICAgICB2LW1vZGVsPVwibmV3VGFza1wiXG4gICAgICAgIEBrZXl1cC5lbnRlcj1cImFkZFRhc2tcIlxuICAgICAgICBjbGFzcz1cImNvbFwiXG4gICAgICAgIHNxdWFyZVxuICAgICAgICBmaWxsZWRcbiAgICAgICAgYmctY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiQWRkIHRhc2tcIlxuICAgICAgICBkZW5zZT5cbiAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgQGNsaWNrPVwiYWRkVGFzaygpXCJcbiAgICAgICAgICByb3VuZFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIGljb249XCJhZGRcIiAvPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS1pbnB1dD5cbiAgPC9kaXY+XG5cbiAgICA8cS1saXN0XG4gICAgY2xhc3M9XCJiZy13aGl0ZVwiXG4gICAgc2VwYXJhdG9yXG4gICAgYm9yZGVyZWQ+XG4gICAgICA8cS1pdGVtXG4gICAgICB2LWZvcj1cIih0YXNrLCBpbmRleCkgaW4gdGFza3NcIlxuICAgICAgOmtleT1cInRhc2sudGl0bGVcIlxuICAgICAgQGNsaWNrPVwidGFzay5kb25lID0gIXRhc2suZG9uZVwiXG4gICAgICA6Y2xhc3M9XCJ7ICdkb25lIGJnLWJsdWUtMScgOiB0YXNrLmRvbmUgfVwiXG4gICAgICBjbGlja2FibGVcbiAgICAgIHYtcmlwcGxlPlxuICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxuICAgICAgICAgIDxxLWNoZWNrYm94XG4gICAgICAgICAgdi1tb2RlbD1cInRhc2suZG9uZVwiXG4gICAgICAgICAgY2xhc3MgPSBcIm5vLXBvaW50ZXItZXZlbnRzXCJcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIiAvPlxuICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyB0YXNrLnRpdGxlIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgIDxxLWl0ZW0tc2VjdGlvblxuICAgICAgICB2LWlmPVwidGFzay5kb25lXCJcbiAgICAgICAgc2lkZT5cblxuICAgICAgICA8cS1idG5cbiAgICAgICAgQGNsaWNrLnN0b3A9XCJkZWxldGVUYXNrKGluZGV4KVwiXG4gICAgICAgIGZsYXRcbiAgICAgICAgcm91bmRcbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgaWNvbj1cImRlbGV0ZVwiIC8+XG4gICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICA8L3EtaXRlbT5cbiAgICA8L3EtbGlzdD5cbiAgICA8ZGl2XG4gICAgICB2LWlmPVwiIXRhc2tzLmxlbmd0aFwiXG4gICAgICBjbGFzcz1cIm5vLXRhc2tzIGFic29sdXRlLWNlbnRlclwiPlxuICAgICAgPHEtaWNvblxuICAgICAgbmFtZT1cImNoZWNrXCJcbiAgICAgIHNpemU9XCIxMDBweFwiXG4gICAgICBjb2xvcj1cInByaW1hcnlcIi8+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSB0ZXh0LXByaW1hcnkgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgTm8gdGFza3NcbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L3EtcGFnZT5cbiAgPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5ld1Rhc2s6ICcnLFxuICAgICAgdGFza3M6IFtcblxuICAgICAgXVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGRlbGV0ZVRhc2tcbiAgICAoaW5kZXgpIHtcbiAgICAgIHRoaXMuJHEuZGlhbG9nKHtcbiAgICAgICAgdGl0bGU6ICdDb25maXJtJyxcbiAgICAgICAgbWVzc2FnZTogJ0FyZSB5b3Ugc3VyZT8nLFxuICAgICAgICBjYW5jZWw6IHRydWUsXG4gICAgICAgIHBlcnNpc3RlbnQ6IHRydWVcbiAgICAgIH0pLm9uT2soKCkgPT4ge1xuICAgICAgICB0aGlzLnRhc2tzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgdGhpcy4kcS5ub3RpZnkoJ1Rhc2sgZGVsZXRlZCcpXG4gICAgICB9KVxuICAgIH0sXG4gICAgYWRkVGFzayAoKSB7XG4gICAgICB0aGlzLnRhc2tzLnB1c2goe1xuICAgICAgICB0aXRsZTogdGhpcy5uZXdUYXNrLFxuICAgICAgICBkb25lOiBmYWxzZVxuICAgICAgfSlcbiAgICAgIHRoaXMubmV3VGFzayA9ICcnXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG4gIC5kb25lIHtcbiAgICAucS1pdGVtX19sYWJlbCB7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcbiAgICAgIGNvbG9yOiAjYmJiO1xuICAgIH1cbiAgfVxuICAubm8tdGFza3Mge1xuICAgIG9wYWNpdHk6MC41O1xuICB9XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX25vcm1hbGl6ZUNsYXNzIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfd2l0aE1vZGlmaWVy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
