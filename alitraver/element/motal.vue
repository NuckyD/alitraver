<template>
	<view>
		<view class="warp" v-show="motalshow">
			<view class="warp-view">
				<view class="warp-text">{{message}}</view>
				<view class="warp-flex">
					<button plain="true" @click="cancal()">取消</button>
					<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo">去登录</button>
				</view>
			</view>
		</view>
		<!-- 及时反馈组件 -->
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	</view>
</template>

<script>
	import {login} from '../common/list.js'
	// 引入即可反馈组件
	import HMmessages from "../common/components/HM-messages/HM-messages.vue"
	
	export default{
		name: 'motal',
		components: {HMmessages},
		data(){
			return{
				motalshow: false,
				message: ''
			}
		},
		methods:{
			getUserInfo(object){
				let user = object.detail.userInfo
				this.motalshow = false
				login(user)
				.then((res) => {
					console.log(res)
					this.HMmessages.show('登录成功',{icon:'success',iconColor:'#ffffff',fontColor:'#ffffff', background:"rgba(102,0,51,0.8)"})
				})
				.catch((err) => {
					console.log(err)
				})
			},
			cancel(){
				this.motalshow = false
			},
			init(message){
				this.motalshow = true
				this.message = message
			}
		}
	}
</script>

<style scoped>
	.warp{
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0,0,0,0.6);
		z-index: 9999;
	}
	.warp-view{
		margin: auto;
		width: 500upx;
		height: 200upx;
		background: #FFFFFF;
		position: absolute;
		-webkit-position:absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: 8upx;
		overflow: hidden;
	}
	.warp-text{
		text-align: center;
		margin-top: 30upx;
		font-size: 34upx;
		color: #666666;
	}
	.warp-flex{ 
		display: flex;
		justify-content: space-around;
		border-top: 1upx solid #EEEEEE;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80upx;
		line-height: 80upx;
		-webkit-transform: translateZ(0);}
	.warp-flex button{
		border: none;
		font-size: 30upx;
	}	
</style>
