/**
 *
 * router.js 路由模块
 * 根据不同的请求方法 + 请求路径 设置具体的请求处理函数
 *
 * */

var express = require('express')
var User = require('./user.js')
var Blog = require('./blog.js')
var Login = require('./login.js')
var Groupa = require('./groupa.js')

//1. 创建一个路由
var router = express.Router()


router.get('/books',function(req,res){
    Login.find(function(err,logins){
        if(err){
            return res.status(500).send('Server err')
        }
        if(logins.length === 0){
            res.render('books.html',{count : 0, logins:logins})
        }
        else{
            res.render('books.html',{count : 1, logins:logins})
        }
    })
})

router.get('/groups',function(req,res){
    Login.find(function(err,logins){
        if(err){
            return res.status(500).send('Server err')
        }
        if(logins.length === 0){
            res.render('groups.html',{count : 0, logins:logins})
        }
        else{
            res.render('groups.html',{count : 1, logins:logins})
        }
    })
})

router.get('/groups-details',function(req,res){
    Login.find(function(err,logins){
        if(err){
            return res.status(500).send('Server err')
        }
        if(logins.length === 0){
            res.render('groups-details.html',{count : 0, logins:logins})
        }
        else{
            res.render('groups-details.html',{count : 1, logins:logins})
        }
    })
})

router.get('/index',function(req,res){
    if(!!req.session.loginUser){
        res.render('index.html',{count : 1, logins:req.session.loginUser})
    }
    else{
        res.render('index.html',{count : 0})
    }
    // Login.find(function(err,logins){
    //     if(err){
    //         return res.status(500).send('Server err')
    //     }
    //     if(logins.length === 0){
    //         res.render('index.html',{count : 0, logins:logins})
    //     }
    //     else{
    //         res.render('index.html',{count : 1, logins:logins})
    //     }
    // })
})

router.get('/',function(req,res){
    if(!!req.session.loginUser){
        res.render('index.html',{count : 1, logins:req.session.loginUser})
    }
    else{
        res.render('index.html',{count : 0})
    }
    // Login.find(function(err,logins){
    //     if(err){
    //         return res.status(500).send('Server err')
    //     }
    //     if(logins.length === 0){
    //         res.render('index.html',{count : 0, logins:logins})
    //     }
    //     else{
    //         res.render('index.html',{count : 1, logins:logins})
    //     }
    // })
})

router.get('/maybe_use',function(req,res){
    Login.find(function(err,logins){
        if(err){
            return res.status(500).send('Server err')
        }
        if(logins.length === 0){
            res.render('maybe_use.html',{count : 0, logins:logins})
        }
        else{
            res.render('maybe_use.html',{count : 1, logins:logins})
        }
    })
})

router.get('/movie-details',function(req,res){
    Login.find(function(err,logins){
        if(err){
            return res.status(500).send('Server err')
        }
        if(logins.length === 0){
            res.render('movie-details.html',{count : 0, logins:logins})
        }
        else{
            res.render('movie-details.html',{count : 1, logins:logins})
        }
    })
})

router.get('/movies',function(req,res){
    Login.find(function(err,logins){
        if(err){
            return res.status(500).send('Server err')
        }
        if(logins.length === 0){
            res.render('movies.html',{count : 0, logins:logins})
        }
        else{
            res.render('movies.html',{count : 1, logins:logins})
        }
    })
})

router.get('/book-details',function(req,res){
    Login.find(function(err,logins){
        if(err){
            return res.status(500).send('Server err')
        }
        if(logins.length === 0){
            res.render('book-details.html',{count : 0, logins:logins})
        }
        else{
            res.render('book-details.html',{count : 1, logins:logins})
        }
    })
})

router.post('/add',function(req,res){
        new Blog(req.body).save(function(err){
        if(err){
            return res.status(500).send('server err')
        }
        res.redirect('/')
    })
})

router.post('/register',function(req,res){
    User.findOne({name: req.body.name}, function (err, content) {
        if (err) {
            res.redirect('/');
        } else {
			if (content === null) {
				if(req.body.password === req.body.repassword)
                {
                    new User(req.body).save(function(err){
                    if(err){
                        return res.status(500).send('server err')
                    }
                    res.redirect('/')
                    })
                }
			}
            else if (content.password === req.body.password) {
            } else  {
                res.redirect('/');
            }
        }
    });
        
})

router.post('/login',function(req,res){
    User.findOne({name: req.body.name}, function (err, content) {
        req.session.regenerate(function(err){
            if (err) {
                res.redirect('/');
            } else {
                if (content === null) {
                    res.redirect('/');
                }
                else if (content.password === req.body.password) {
                        req.session.loginUser = req.body.name;
                        console.log(req.session.loginUser);
                        res.redirect('/')
                } else  {
                    res.redirect('/');
                }
            }
        })
    });
})

  // 退出登录
router.get('/logout', function(req, res, next){
// 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
// 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
// 然后去查找对应的 session 文件，报错
// session-file-store 本身的bug  
    console.log(req.session.loginUser);
    req.session.destroy(function(err) {
        if(err){
        res.json({ret_code: 2, ret_msg: '退出登录失败'});
        return;
        }
        res.redirect('/');
    });
});
  


// ==================删除用户====================
router.get('/delete',function(req,res){
    // 通过 id 查找到对应用户进行删除 User.findByIdAndDelete()
    User.findByIdAndRemove(req.query.id.replace(/"/g,''),function(err){
        if(err){
            return res.status(500).send('server error')
        }

    })
    res.redirect('/')
})

// router.get('/logout',function(req,res){
//     Login.findByIdAndRemove(req.query.id.replace(/"/g,''),function(err){
//         if(err){
//             return res.status(500).send('server error')
//         }
//     })
//     res.redirect('/')
// })

// 把路由导出
module.exports = router