<?php

class PdoMySQL {
    public static $config = array();
    public static $link = null;//�������Ӷ���
    public static $pconnect = true;//����������
    public static $connected = false;//�ж��Ƿ����ӳɹ�
    public static $stmt = null;//����PDOStatement����
    
    //���캯��
    public function __construct() {
        if(!class_exists('PDO')) {
            self::throw_exception('��֧��PDO,���ȿ���');
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
        //ȷ������new���ٴΣ���ֻ����һ�����Ӷ���
        if(!isset(self::$link)){
            $configs = self::$config;
            if(self::$pconnect) {
                //���������ӣ���ӵ�����������
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
   
            //���ñ���
            self::$link->exec('SET NAMES '.DB_CHARSET);
            self::$connected = true;
            unset($configs);
        }
        
    }
    //�Զ���һ����ѯ����,�õ�һ����¼
    public function query($sql = '') {
        if(!empty(self::$stmt)) {
            self::free();
        }
        self::$stmt = self::$link->prepare($sql);
        $res = self::$stmt->execute();
        return self::$stmt->fetch(PDO::FETCH_ASSOC);
    }
    //��װһ����ѯ����,�õ����м�¼
    public function queryAll($sql = '') {
        //����������Ϊ�գ������
        if(!empty(self::$stmt)) {
            self::free();
        }
        self::$stmt = self::$link->prepare($sql);
        $res = self::$stmt->execute();
        return self::$stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    //�Զ���һ����ɾ�ĵĺ���
    public function execute($sql = '') {
        $result = self::$link->exec($sql);
        return $result.'�������յ���Ӱ��';
    }
    //����������ѯ
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
    //�����ݿ����һ������
    public function add($table,$data) {
        $keys = join(',',array_keys($data));
        $values = join("','",array_values($data));
        $sql = "INSERT {$table}($keys) VALUES('{$values}')";
        return $this->execute($sql);
        
    }
    //�Զ���������ݿ�ĺ���
    //ע�⣬updateֻ�����Ƹ��µ��������������ƴӵڼ�����ʼ���¶�����
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
    //�Զ���ɾ�����ݵĺ���,ͬ����ɾ��Ҳֻ���޶�ɾ���������������޶������￪ʼɾ��
    public function delete($table,$where,$order,$limit) {
        $sql = "DELETE FROM {$table}".self::where($where).self::order($order).self::limit($limit);   
        return $this->execute($sql);
        echo $sql;
    }
    //��������������where() order() limit()
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
    //�ͷŽ��������
    public static function free() {
        self::$stmt = null;
    }
    
    /* �Զ�������� */
    public static function throw_exception($errMsg) {
        echo '<div>'.$errMsg.'</div>';
    }
    //�������Ӷ��󣬼��ر����ݿ�
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


