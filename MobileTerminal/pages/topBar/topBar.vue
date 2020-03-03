<template>
	<view class="top-content">
		<image style="width: 100px; height: 30px; padding:10px;" src="../../static/image/webtitle.png" @error="imageError"></image>
		<uni-search-bar placeholder="搜索" @confirm="search" class="searchbar"></uni-search-bar>
	</view>
</template>

<script>
	import {
		uniSearchBar
	} from '@/components/uni-search-bar/uni-search-bar.vue'

	export default {
		components: {uniSearchBar},
		data() {
			return {}
		},
		onLoad() {},
		methods: {
			search(text){
				console.log(text)
				this.$emit('searchValue',text)
			}
		}
	}
</script>

<style lang="scss">
	.top-content {
		width: 100%;
		height: 50px;
		white-space: nowrap;
	}
	.searchbar {
		display: inline-block;
		float: right;
		width: 50%;
		margin-right: 10px;
	}
</style>
