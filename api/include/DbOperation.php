<?php

class DbOperation
{
    private $con;

    function __construct()
    {
        require_once dirname(__FILE__) . '/DbConnect.php';
        $db = new DbConnect();
        $this->con = $db->connect();
    }


    /**
     *  Method to add new employee
     * @param $UserId
     * @param $fullname
     * @param $address
     * @param $gender

     * @return bool
     */
    public function addNewRoom($start_date, $end_date, $text,$room,$status,$is_paid,$Name,$Email,$ReferredBy,$Category){
       $strInsertQry="INSERT INTO bookings(start_date, end_date, text,room,status,is_paid,Name,Email,ReferredBy,Category) "
                      ." VALUES (?,?,?,?,?,?,?,?,?,?)";
        $stmt = $this->con->prepare($strInsertQry);
        $stmt->bind_param("sssisissss", $start_date, $end_date, $text,$room,$status,$is_paid,$Name,$Email,$ReferredBy,$Category);
        $result = $stmt->execute();
        $stmt->close();
        if($result){
            return true;
        }
        return false;
    }

    public function updateRoom($roomId,$start_date, $end_date, $text,$room,$status,$is_paid,$Name,$Email,$ReferredBy,$Category){
        $strInsertQry="update bookings set start_date=?, end_date =?, text=?,room=?,status=?,is_paid=?,Name=?,Email=?,ReferredBy=?,Category=? "
            ." where id=?";
        $stmt = $this->con->prepare($strInsertQry);
        $stmt->bind_param("sssisissssi", $start_date, $end_date, $text,$room,$status,$is_paid,$Name,$Email,$ReferredBy,$Category,$roomId);
        $result = $stmt->execute();
        $stmt->close();
      return $result;// $num_affected_rows>=0;

    }

    public function ListRoom_Bookings()
    {
            $sql = "SELECT room,start_date,end_date,text,id,status,is_paid,Name,Email,ReferredBy,Category FROM bookings";
            $result = $this->con->query($sql);
            $this->con->close();
            return $result;
    }
    public function ListRoom()
    {
            $RoomListsql = "SELECT id,id as value,concat(prefix,'-',roomno) as label,type,status FROM rooms";
            $result = $this->con->query($RoomListsql);
            $this->con->close();
            return $result;
    }
    public function ListbookingStatus()
    {
           $bookingStatusSql= "SELECT id,name FROM booking_statuses";
            $result = $this->con->query($bookingStatusSql);
            $this->con->close();
            return $result;
    }
    
    public function delete_bookings($bookingId){
        $strInsertQry="delete from bookings where id = ? ";

        $stmt = $this->con->prepare($strInsertQry);

        $stmt->bind_param("i",$bookingId );

        $stmt->execute();
        $num_affected_rows = $stmt->affected_rows;
        $stmt->close();
if($num_affected_rows > 0)
        return "true";
        else
            return "false";
    } 
}