<template>
  <div>
    <textarea ref="mycode" v-model="value" class="codesql" />
  </div>
</template>
<script>
import 'codemirror/theme/ambiance.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
const CodeMirror = require('codemirror/lib/codemirror')
require('codemirror/addon/edit/matchbrackets')
require('codemirror/addon/selection/active-line')
require('codemirror/mode/sql/sql')
require('codemirror/addon/hint/show-hint')
require('codemirror/addon/hint/sql-hint')
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    sqlStyle: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      editor: null
    }
  },
  computed: {
    // eslint限制computed中无法直接修改data中的数据
    // eslint-disable-next-line vue/return-in-computed-property
    newVal() {
      if (this.editor) {
        return this.editor.getValue()
      }
    }
  },
  watch: {
    newVal(newV, oldV) {
      if (this.editor) {
        this.$emit('changeTextarea', this.editor.getValue())
      }
    }
  },

  mounted() {
    const mime = 'text/x-mariadb'
    // 设置主题，不设置的会使用默认主题
    const theme = 'ambiance'
    this.editor = CodeMirror.fromTextArea(this.$refs.mycode, {
      // 编辑器value
      value: this.value,
      // 选择对应代码编辑器的语言
      mode: mime,
      // 用tab缩进
      indentWithTabs: true,
      // 换行自动缩进
      smartIndent: true,
      // 显示行号
      lineNumbers: true,
      // 括号匹配
      matchBrackets: true,
      cursorHeight: 1,
      lineWrapping: true,
      readOnly: false,
      theme: theme,
      // autofocus: true,
      // 自定义快捷键
      extraKeys: {
        'Esc': function(cm) {
          console.log('esc be click')
          var fullScreen = cm.getOption('fullScreen')
          cm.setOption('fullScreen', !fullScreen)
        },
        Ctrl: 'autocomplete'
      },
      hintOptions: {
        // 自定义提示选项
        // 当匹配只有一项的时候是否自动补全
        completeSingle: false,
        tables: {
          users: ['name', 'score', 'birthDate'],
          countries: ['name', 'population', 'size']
        }
      }
    })
    // 代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
    this.editor.on('inputRead', () => {
      this.editor.showHint()
    })
  },
  methods: {
    setVal() {
      if (this.editor) {
        if (this.value === '') {
          this.editor.setValue('')
        } else {
          this.editor.setValue(this.value)
        }
      }
    }
  }
}
</script>
<style>
.CodeMirror {
  color: black;
  /* direction: ltr; */
  line-height: 30px;
}
.CodeMirror-hints {
  z-index: 9999 !important;
}
</style>
