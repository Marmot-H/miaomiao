<template>
    <div class="city_body">
        <div class="city_list" ref="city_list">
            <div>
                <div class="city_hot">
                    <h2>热门城市</h2>
                    <ul class="clearfix">
                        <li v-for="item in hostList" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
                    </ul>
                </div>
                <div class="city_sort" ref="city_sorts">
                    <div v-for="item in cityList" :key="item.index">
                        <h2>{{item.index}}</h2>
                        <ul>
                            <li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm,itemList.id)">{{itemList.nm}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" @touchstart="hanldToIndex(index)">{{item.index}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: 'index',
        data () {
           return {
               cityList:[],
               hostList: [],
           }
        },
        mounted () {
            let cityList = window.localStorage.getItem("cityList");
            let hostList = window.localStorage.getItem("hostList");
            if (cityList && hostList) {
                this.cityList = JSON.parse(cityList);
                this.hostList = JSON.parse(hostList);
            }else {
                this.axios.get('/api/cityList').then((res)=>{
                    if (res.data.msg === 'ok') {
                        let cities = res.data.data.cities
                        //城市数据分割方式
                        // [ { index:"B",list:[{nm:"北京",id:1}]  } ]
                        let {cityList,hostList} = this.formatCityList(cities);
                        this.cityList = cityList;
                        this.hostList = hostList;
                        window.localStorage.setItem("cityList",JSON.stringify(cityList));
                        window.localStorage.setItem("hostList",JSON.stringify(hostList));
                    }
                });
            }
            let scroll = new BScroll(this.$refs.city_list,{
                tap:true,
            })

            this.scroll = scroll;
        },
        methods:{
            formatCityList(cities){
                let cityList=[];
                let hostList=[];
                for (let i = 0; i < cities.length; i++) {
                    if (cities[i].isHot === 1) {
                        hostList.push(cities[i])
                    }
                }
                for (let i = 0; i <cities.length ; i++) {
                    let firstLetter = cities[i].py.substr(0,1).toUpperCase();
                    if (toCom(firstLetter)){//新添加index
                        cityList.push({index:firstLetter, list:[ { nm:cities[i].nm, id:cities[i].id} ] } )
                    }else {//累加到已有index中
                        for (let j = 0; j < cityList.length; j++) {
                            if (cityList[j].index === firstLetter) {
                                cityList[j].list.push({nm:cities[i].nm, id:cities[i].id});
                            }
                        }
                    }
                }
                function toCom(firstLetter) {
                    for (let i = 0; i < cityList.length; i++) {
                        if (cityList[i].index === firstLetter) {
                            return false;
                        }
                    }
                    return true;
                }
                cityList.sort((n1,n2)=>{
                    if (n1.index > n2.index){
                        return 1;
                    } else if (n1.index < n2.index){
                        return -1;
                    } else {
                        return 0;
                    }
                })
                return {
                    cityList,
                    hostList
                }
            },
            hanldToIndex(index){
                let h2 = this.$refs.city_sorts.getElementsByTagName("h2");
                // this.$refs.city_sorts.parentNode.scrollTop = h2[index].offsetTop;
                this.scroll.scrollTo(0,-h2[index].offsetTop)
            },
            handleToCity(nm,id){
                this.$store.commit("city/CITY_INFO",{nm,id});
                window.localStorage.setItem("nowNm",nm)
                window.localStorage.setItem("nowId",id)
                this.$router.push("/movie/nowplaying")
            }
        }
    };
</script>

<style scoped>
    /*#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}*/
    /*.city_body {height:521px}*/
    .city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;height: 520px}
    .city_body .city_list::-webkit-scrollbar{
        background-color:transparent;
        display: none;
        width:0;
    }
    .city_body .city_hot{ margin-top: 20px;}
    .city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
    .city_body .city_sort div{ margin-top: 20px;}
    .city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
    .city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
    /*.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}*/
    .city_index{z-index: 1;width: auto;height: 90%;position: absolute;top:15%;
        right: 0px;text-align: center;font-size: 12px}
    /*.city_index ::-webkit-scrollbar{display: none}*/
</style>