<template>
	<view>
		<home-load v-if="homeload"></home-load>
		<search :banner="banner"></search>
		<ticket></ticket>
		<classify></classify>
		<content :tab="tab" id="boxFixed" :class="{'is_fixed': isFixed}"></content>
		<view style="height: 140upx"></view>
		<load-list v-if="loadingstatus"></load-list>
		<articleA :articles="articles" v-if="!loadingstatus"></articleA>
		<view class="load-more" v-if="loadMore">
			<uni-load-more :status="loadMoreStatus" color="#FFCC99"></uni-load-more>
		</view>
		<none-data v-if="nonedata"></none-data>
	</view>
</template>

<script>
	import search from './components/search.vue'
	import ticket from './components/ticket.vue'
	import classify from './components/classify.vue'
	import content from './components/content.vue'
	import articleA from './components/article.vue'
	import uniLoadMore from '../../common/components/uni-load-more/uni-load-more.vue'//引用上拉加载插件
	
	import {data, datalist} from '../../common/cloudfun.js'
	import {mapState} from 'vuex'
	//打印
	var {log} = console
	export default {
		components:{
			search,
			ticket,
			classify,
			content,
			articleA,
			uniLoadMore
		},
		
		data() {
			return {
				title: 'Hello',
				isFixed: false,
				rect: '',
				menutop: '',
				banner: [],
				tab: [],
				loadingstatus: false,
				articles: [],
				pageNumber: 1,
				nav: 'recomment',
				loadMore: false,
				loadMoreStatus: 'loading',
				nonedata: false,
				homeload: true
			}
		},
		
		created() {
			const banner = 'banner'
			const tab = 'tab'
			Promise.all([data(banner), data(tab), datalist(this.nav, this.pageNumber)])
			.then((res) => {
				//console.log(res)
				this.banner = res[0].data
				this.tab = res[1].data
				this.articles = res[2].data
				this.homeload = false
			})
			.catch((err) => {
				console.log(err)
			})
			
		},
		
		onLoad() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#boxFixed').boundingClientRect(data => {
			  this.menutop = data.top
			}).exec();
		},
		
		onPageScroll(e){
			this.rect = e.scrollTop
		},
		
		//触底，上拉加载
		onReachBottom(){
			if(!this.nonedata){//有数据才加载更多
				this.loadMore = true
				this.loadMoreStatus = 'loading'
				this.pageNumber++
				this.pullon()
			}
		},
		
		methods: {
			pullon(){
				log(this.nav)
				log(this.pageNumber)
				datalist(this.nav, this.pageNumber)
				.then((res) => {
					if(res.data.length == 0){
						this.loadMoreStatus = 'noMore'
					}else{
						this.articles = [...this.articles, ...res.data]
					}
					
				})
				.catch((err) => {
					log(err)
				})
			}
		},
		
		//计算属性会时刻监听数据变化，只要数据发生变化，计算属性就会执行
		computed: {
			namepage(){
				if(this.rect > this.menutop){
					this.isFixed = true
				}else {
					this.isFixed = false
				}
			},
			// 取出vuex数据仓库的数据
			...mapState(['list', 'loading', 'navdata']),
			// 取到tab切换的数据
			count(){
				console.log(this.list)
				console.log(this.list.nonedata)
				this.articles = this.list.listing
				this.nonedata = this.list.nonedata
			},
			countload(){
				this.loadingstatus = this.loading.loadingstatus
			},
			//获取切换tab数据
			navcount(){
				this.loadingstatus = this.navdata.loadingstatus
				this.nav = this.navdata.nav
				this.pageNumber = this.navdata.pageNumber
				this.loadMore = this.navdata.loadMore
				this.loadMoreStatus = this.navdata.loadMoreStatus
				this.nonedata = this.navdata.nonedata
			}
		}
	}
</script>

<style>
	.is_fixed{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}
	
	.load-more{
		height: 140upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
