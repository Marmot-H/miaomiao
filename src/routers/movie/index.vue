<template>
</template>

<script>
    export default {
        // name: 'index',
        path: '/movie',
        component:()=>import('@/views/Movie/index'),
        children:[
            {
                path: 'city',
                component:()=>import('@/components/City')
            },
            {
                path: 'nowplaying',
                component:()=>import('@/components/NowPlaying')
            },
            {
                path: 'comingsoon',
                component:()=>import('@/components/ComingSoon')
            },
            {
                path: 'search',
                component:()=>import('@/components/Search')
            },
            {
                path: '/movie',
                redirect: '/movie/nowplaying'
            }
        ]
    };
</script>

<style scoped>

</style>