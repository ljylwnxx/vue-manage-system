import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        // 记录路由和高亮的对应关系
        currentMenu: null,
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 用于改变state中的tabsList数组
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val
                //拿到当前选中项是否在tags中
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if (result === -1) {//不存在
                    state.tabsList.push(val)
                } else {
                    //将选中的标识进行重置
                    state.currentMenu = null;
                }
            }

        },
        closeTag(state, val) {
            //找到当前点击的val(tag)所对应的index来删除该数据
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)

        },
        setMenu(state, val) {
            state.menu = val
            //将menu缓存到coolie中 避免在刷新页面的时候丢失menu
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state, router) {

            if (!Cookie.get('menu')) {
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            //对拿到的menu进行处理
            const menuArray = []
            //menu中包括以及及二级菜单
            menu.forEach(item => {
                //处理二级菜单
                if (item.children) {
                    console.log(item.children);
                    item.children = item.children.map(item => {
                        //动态添加路由
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            //实现路由的动态添加
            menuArray.forEach(item => {
                console.log(router);
                router.addRoute('Main', item)
            })
        }
    }
}