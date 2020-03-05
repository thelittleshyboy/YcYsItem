<template>
  <div id="app">
    <el-upload
      action
      :multiple="multiple"
      :accept="accept"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-success="onSuccess"
      :on-error="onError"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :list-type="listType"
      :auto-upload="false"
      :http-request="httpRequest"
      :limit="limit"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>

export default {
  name: 'upload',
  props: {
    multiple: {
      type: Boolean,
      default: true
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    accept: {
      type: String,
      default: undefined
    },
    onPreview: {
      type: Function,
      default: (file) => {
        if (!file.url) {
          return;
        }
        window.open(file.url)
      }
    },
    listType: {
      type: String,
      validator: (value) => {
        // 这个值必须匹配下列字符串中的一个
        return !value || ['text', 'picture', 'picture-card'].some(el => el === value)
      },
      default: 'picture'
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    fileList: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 1
    },
    onRemove: {
      type: Function,
      default: () => { }
    },
    onSuccess: {
      type: Function,
      default: () => { }
    },
    onChange: {
      type: Function,
      default: () => { }
    },
    beforeRemove: {
      type: Function,
      default: () => { }
    },
    beforeUpload: {
      type: Function,
      default: () => { }
    },
    onError: {
      type: Function,
      default: () => { }
    },
    httpRequest: {
      type: Function,
      default: () => { }
    }
  },
  data() {
    return {
      dialogVisible: false,

    }
  },
  methods: {
    onPersonalSubmit() {
      const formData = new FormData();
      const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (!this.uploadFile) { // 若未选择文件
        this.$message.error('请选择上传图片')
        return false;
      }
      formData.append('file', this.uploadFile);
      formData.append('userId', JSON.parse(localStorage.getItem('user'))._id);
    },
  }
}
</script>

<style>
</style>
