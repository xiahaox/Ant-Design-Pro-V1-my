// import { log } from "handlebars";
// 获取权限菜单
export const getMenu=(menuData,privileges)=>{
    console.log(menuData);
    console.log(privileges);
    var menu=[]
    for (let i = 0; i < menuData.length; i++) {
        menu.push({
            name:menuData[i].name,
            path:menuData[i].path,
            meta:menuData[i].meta,
            children:filterChilds(menuData[i].children)
        })
    }
    function filterChilds(childsData) {
    const array=[]
        childsData.forEach(item=>{
         if (item.children) {
            array.push({
                name:item.name,
                path:item.path,
                meta:item.meta,
                children:filterChilds(item.children)
            }) 
         }else{
            if (privileges.includes(item.name) ) {
                array.push(item)
            }
         }
        })
        return array
    }
    // console.log(menu);
    return menu
}

export const getRouter=(routerData,privileges)=>{
    console.log(routerData,privileges);
    const result=[]
   Object.keys(routerData).forEach(key=>{
        if (privileges.includes(routerData[key].name)||key==='/home') {
            result.push({
                path:key,
                component:routerData[key].component,
                name:routerData[key].name
            }) 
        }
    })
    // console.log(result);
    
    return result
}

export const getOpenKeys=(menuData,pathname)=>{
    let key; 
    menuData.forEach(item=>{
        if (item.children) {
            item.children.forEach(i=>{
                if (i.path==pathname) {
                    key=item.name
                    return false
                }
            })
        }
    })
    return key
}
