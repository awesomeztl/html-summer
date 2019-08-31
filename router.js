/**
 *
 * router.js 路由模块
 * 根据不同的请求方法 + 请求路径 设置具体的请求处理函数
 *
 * */

var express = require('express')
var User = require('./user.js')
var Bloga = require('./bloga.js')
var Blogb = require('./blogb.js')
var Login = require('./login.js')
var BookPost = require('./bookpost.js')
var MoviePost = require('./moviepost.js')
var Apply = require('./apply.js')
var Groupa = require('./groupa.js')

//1. 创建一个路由
var router = express.Router()


router.get('/books',function(req,res){
    if(!!req.session.loginUser){
        res.render('books.html',{count : 1, logins:req.session.loginUser})
    }
    else{
        res.render('books.html',{count : 0})
    }
})

router.get('/groups',function(req,res){
    if(!!req.session.loginUser){
        res.render('groups.html',{count : 1, logins:req.session.loginUser})
    }
    else{
        res.render('groups.html',{count : 0})
    }
})

router.get('/group-details',function(req,res){
    Groupa.findOne({name: req.session.loginUser}, function (err, content) {
        if (content === null) {
            Bloga.find(function(err,Blogs){
                if(err){
                    return res.status(500).send('Server err')
                }
                if(!!req.session.loginUser){
                    res.render('group-details.html',{power : 1 ,count : 1, logins:req.session.loginUser,Blogs : Blogs})
                }
                else{
                    res.render('group-details.html',{power : 0 ,count : 0, logins:req.session.loginUser,Blogs : Blogs})
                }
            })
        }
        else if (content.power !== "admin") {
            Bloga.find(function(err,Blogs){
                if(err){
                    return res.status(500).send('Server err')
                }
                res.render('group-details.html',{power : 2 ,count : 1, logins:req.session.loginUser,Blogs : Blogs})
            })
        } else  {
            Bloga.find(function(err,Blogs){
                if(err){
                    return res.status(500).send('Server err')
                }
                res.render('group-details.html',{power : 3 ,count : 1, logins:req.session.loginUser,Blogs : Blogs})
            })
        }
    });
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
    if(!!req.session.loginUser){
        res.render('/maybe_use.html',{count : 1, logins:req.session.loginUser})
    }
    else{
        res.render('/maybe_use.html',{count : 0})
    }
})

router.get('/movie-details',function(req,res){
    if(!!req.session.loginUser){
        MoviePost.find(function(err,MoviePosts){
        if(err){
            return res.status(500).send('Server err')
        }
            res.render('movie-details.html', {count : 1, logins:req.session.loginUser,MoviePosts : MoviePosts})
        })
    }
    else{
        MoviePost.find(function(err,MoviePosts){
            if(err){
                return res.status(500).send('Server err')
            }
                res.render('movie-details.html', {count : 0, logins:req.session.loginUser,MoviePosts : MoviePosts})
            })
    }
})

router.get('/movies',function(req,res){
    if(!!req.session.loginUser){
        res.render('movies.html',{count : 1, logins:req.session.loginUser})
    }
    else{
        res.render('movies.html',{count : 0})
    }
})

router.get('/book-details',function(req,res){
    if(!!req.session.loginUser){
        BookPost.find(function(err,BookPosts){
        if(err){
            return res.status(500).send('Server err')
        }
            res.render('book-details.html', {count : 1, logins:req.session.loginUser,BookPosts : BookPosts})
        })
    }
    else{
        BookPost.find(function(err,BookPosts){
            if(err){
                return res.status(500).send('Server err')
            }
                res.render('book-details.html', {count : 0, logins:req.session.loginUser,BookPosts : BookPosts})
            })
    }
})

router.post('/addMoive',function(req,res){
    new MoviePost(req.body).save(function(err){
    if(err){
        return res.status(500).send('server err')
    }
    res.redirect('/movie-details')
    })
})

router.post('/addGroupa',function(req,res){
    new Groupa(req.body).save(function(err){
        if(err){
            return res.status(500).send('server err')
        }
        res.redirect('/group-details')
    })
})

router.post('/beadmina',function(req,res){
    Groupa.update({name:req.session.loginUser},{$set:{name:req.body.name,power:req.body.power}},function(err,rs){
        if(err){
            console.log(err);
        }else{
            res.redirect('/group-details')
        }
    });
})

router.post('/addBook',function(req,res){
    new BookPost(req.body).save(function(err){
    if(err){
        return res.status(500).send('server err')
    }
    res.redirect('/book-details')
    })
})

router.post('/adda',function(req,res){
    new Bloga(req.body).save(function(err){
    if(err){
        return res.status(500).send('server err')
    }
    res.redirect('/')
    })
})

router.post('/addb',function(req,res){
    new Bloga(req.body).save(function(err){
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
                        req.session.regenerate(function(err){
                            if (err) {
                                res.redirect('/');
                            } else {
                                req.session.loginUser = req.body.name;
                                res.redirect('/')
                            }
                        })
                    })
                }
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

router.get('/deleteBloga',function(req,res){
    // 通过 id 查找到对应用户进行删除 User.findByIdAndDelete()
    Bloga.findByIdAndRemove(req.query.id.replace(/"/g,''),function(err){
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