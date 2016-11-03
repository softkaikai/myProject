<?php

class PdoMySQL {
    public static $config = array();
    public static $link = null;//保存连接对象
    public static $pconnect = true;//开启长连接
    public static $connected = false;//判断是否连接成功
    public static $stmt = null;//保存PDOStatement对象
    
    //构造函数
    public function __construct() {
        if(!class_exists('PDO')) {
            self::throw_exception('不支持PDO,请先开启');
        }
        
        $dbConfig = array(
            'hostname'=>DB_HOST,
            'username'=>DB_USER,
            'password'=>DB_PWD,
            'database'=>DB_NAME,
            'hostport'=>DB_PORT,
            'dbms'=>DB_TYPE,
            'dsn'=>DB_TYPE.':host'.DB_HOST.';dbname'.DB_NAME
        ); 
        
        self::$config = $dbConfig;
        if(empty(self::$config['params']))self::$config['params']=array();
        //确保不管new多少次，都只生产一个连接对象
        if(!isset(self::$link)){
            $configs = self::$config;
            if(self::$pconnect) {
                //开启长连接，添加到配置数组中
                $configs['params']['PDO::ATTR_PERSISTENT']=true;
            }
            $arr = array(
                'PDO::ATTR_PERSISTENT'=>true
            );
            try{
                self::$link = new PDO('mysql:host=localhost;dbname=weibo','root','08310913',$arr);
            }catch(PDOException $e) {
                self::throw_exception($e->getMessage());
            }
   
            //设置编码
            self::$link->exec('SET NAMES '.DB_CHARSET);
            self::$connected = true;
            unset($configs);
        }
        
    }
    //自定义一个查询函数,得到一条记录
    public function query($sql = '') {
        if(!empty(self::$stmt)) {
            self::free();
        }
        self::$stmt = self::$link->prepare($sql);
        $res = self::$stmt->execute();
        return self::$stmt->fetch(PDO::FETCH_ASSOC);
    }
    //封装一个查询函数,得到所有记录
    public function queryAll($sql = '') {
        //如果结果集不为空，先清空
        if(!empty(self::$stmt)) {
            self::free();
        }
        self::$stmt = self::$link->prepare($sql);
        $res = self::$stmt->execute();
        return self::$stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    //自定义一个增删改的函数
    public function execute($sql = '') {
        $result = self::$link->exec($sql);
        return $result.'条数据收到了影响';
    }
    //根据条件查询
    public function queryWhere($fields,$table,$where='',$type='') {
        $sql1 = "select %s from %s";
        if(!$where) {
            $sql2 = '%s';
        } else {
            $sql2 = " where %s";
        }
        $str = sprintf($sql1,$fields,$table).sprintf($sql2,$where);
        echo $str;
        if(!$type) {
            return $this->query($str);
        } else {
            return $this->queryAll($str);
        }
        
    }
    //给数据库插入一条数据
    public function add($table,$data) {
        $keys = join(',',array_keys($data));
        $values = join("','",array_values($data));
        $sql = "INSERT {$table}($keys) VALUES('{$values}')";
        return $this->execute($sql);
        
    }
    //自定义更新数据库的函数
    //注意，update只能限制更新的条数，不能限制从第几条开始更新多少条
    //update user set username = '$username',password='$password' where id = 1 order by id limit 2,3
    public function update($table,$data,$where,$order,$limit) {
        $str = "UPDATE {$table} SET ";
        foreach($data as $key=>$val) {
            $str.=$key."='".$val."',";
        }
        $str = rtrim($str,',');
        $str = $str.self::where($where).self::order($order).self::limit($limit);
        var_dump($str);
        return $this->execute($str);
    }
    //自定义删除数据的函数,同样，删除也只能限定删除的条数而不能限定从哪里开始删除
    public function delete($table,$where,$order,$limit) {
        $sql = "DELETE FROM {$table}".self::where($where).self::order($order).self::limit($limit);   
        return $this->execute($sql);
        echo $sql;
    }
    //解析参数函数，where() order() limit()
    public static function where($data='') {
        if(!$data) {
            return '';
        } else {
            return " where {$data}";
        }
    }
    public static function order($data = '') {
        if(!$data) {
            return '';
        } else {
            return " order {$data}";
        }
    }
    public static function limit($data = '') {
        if(!$data) {
            return '';
        } else {
            return " limit {$data}";
        }
    }
    //释放结果集函数
    public static function free() {
        self::$stmt = null;
    }
    
    /* 自定义错误处理 */
    public static function throw_exception($errMsg) {
        echo '<div>'.$errMsg.'</div>';
    }
    //销毁连接对象，即关闭数据库
    public function close() {
        self::$link = null;
    }
}
require_once "config.php";


// $pdo = new PdoMySQL();
// $sql = 'delete from user where username="Alice9" or username="Alice8"';
// $arr = array(
//     'password'=>'wangdama',
//     'email'=>'wangyi@163.com'
// );
// // $pdo->close();
// var_dump($pdo->delete('user','id < 50','by id','2'));
// // var_dump($pdo->update('user',$arr,'id<50','by id','3'));
// // var_dump($pdo->add('user',$arr));
// echo '<br>';
// echo 'PDO::ATTR_PERSISTENT';


