const menuData=[
    {
    name:'user',
    path:'/user',
    meta: {
        icon: 'user',
        title: '用户',
      },
    children:[
        {
            name: 'user1',
            path: '/user/user1',
            meta: {
                icon: 'fire',
                title: '用户1',
              },
            children:[
                {
                    name: 'user1Detail',
                    path: '/user/user1/user1Detail',
                    meta: {
                        icon: 'fire',
                        title: '用户1详情',
                      },
                }
            ] 
        },
        {
            name: 'user2',
            path: '/user/user2',
            meta: {
                icon: 'fire',
                title: '用户2',
              },
        }
    ]
    },
    {
        name:'list',
        path:'/list',
        meta: {
            icon: 'unordered-list',
            title: '列表',
          },
        children:[
            {
                name: 'list1',
                path: '/list/list1',
                meta: {
                    icon: 'fire',
                    title: '列表1',
                  },
            },
            {
                name: 'list2',
                path: '/list/list2',
                meta: {
                    icon: 'fire',
                    title: '列表2',
                  },
            },
            {
                name: 'list3',
                path: '/list/list3',
                meta: {
                    icon: 'fire',
                    title: '列表3',
                  },
            }
        ]
    },
    // {
    //     name:'numberone',
    //     path:'/numberone',
    //     meta: {
    //         icon: 'fire',
    //         title: 'one',
    //       }
    //     // children:[
    //     //     {
    //     //         name: 'numberone',
    //     //         path: '/numberone/one',
    //     //         meta: {
    //     //             icon: 'fire',
    //     //             title: 'one',
    //     //           },
    //     //     },
    //     // ]
    // }

]
export default menuData