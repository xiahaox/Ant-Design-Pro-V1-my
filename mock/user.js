const Mock=require('mockjs');
//延时400s请求到数据

let db=Mock.mock({
    'listData|3-6':[{
        id:'@id',
        name:'@name',
        'age|18-32':1
    }]
});

module.exports={
    [`GET /api/users`](req,res){
        res.json(db);
    },

    [`POST /api/addUsers`](req,res){
        let user=req.body;
        user.id=Mock.mock('@id');
        db.listData.push(user);
        res.status(200).json(db);
    },
    [`POST /api/login`](req,res){
        res.json({
            data:{
                user:'战神',
                token:'zhanshen',
                privileges:['user1Detail','user2','list1','list2']
            },
            status:200,
        });
    },
    [`GET /api/userInfo`](req,res){
        res.json({privileges:['user1Detail','user2','list1','list2'],user:'战神'});
    },
    'GET /api/logout': (req, res) => {
        res.send({ status: 'ok' });
      },
    'GET /api/outTime': (req, res) => {
    res.send({ code: '403' });
    },
}
