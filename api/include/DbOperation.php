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
    public function add_New_Booking($start_date, $end_date, $room_type,$bed_type,$No_of_guests,$No_of_male,$No_of_female,$Arrival_flight_details,$Departure_flight_details, $room,$status,$is_taxi,$is_paid,$Name,$Email,$ReferredBy,$Category,$Description){
       $strInsertQry="INSERT INTO bookings(start_date, end_date, room_type,bed_type,No_of_guests,No_of_male,No_of_female,Arrival_flight_details,Departure_flight_details,room,status,is_taxi,is_paid,Name,Email,ReferredBy,Category,Description) "
                      ." VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $stmt = $this->con->prepare($strInsertQry);
        $stmt->bind_param("ssssiiissisiisssss", $start_date, $end_date, $room_type,$bed_type,$No_of_guests,$No_of_male,$No_of_female,$Arrival_flight_details,$Departure_flight_details,$room,$status,$is_taxi,$is_paid,$Name,$Email,$ReferredBy,$Category,$Description);
        $result = $stmt->execute();
        $stmt->close();
        if($result){
            return true;
        }
        return false;
    }

    public function update_New_Booking($roomId,$start_date, $end_date, $room_type,$bed_type,$No_of_guests,$No_of_male,$No_of_female,$Arrival_flight_details,$Departure_flight_details, $room,$status,$is_taxi,$is_paid,$Name,$Email,$ReferredBy,$Category,$Description){
        $strInsertQry="update bookings set start_date=?, end_date =?, room_type=?,bed_type=?,No_of_guests=?,No_of_male=?,No_of_female=?,Arrival_flight_details=?,Departure_flight_details=?,room=?,status=?,is_taxi=?,is_paid=?,Name=?,Email=?,ReferredBy=?,Category=?,Description=? "
            ." where id=?";
        $stmt = $this->con->prepare($strInsertQry);
        $stmt->bind_param("ssssiiissisiisssssi",$start_date, $end_date, $room_type,$bed_type,$No_of_guests,$No_of_male,$No_of_female,$Arrival_flight_details,$Departure_flight_details,$room,$status,$is_taxi,$is_paid,$Name,$Email,$ReferredBy,$Category,$Description,$roomId);
        $result = $stmt->execute();
        $stmt->close();
      return $result;// $num_affected_rows>=0;

    }
    public function add_NewRoom($roomno,$prefix){
        $status=0;
          $strInsertQry="INSERT INTO rooms(roomno, status, prefix) "
                       ." VALUES (?,?,?)";
         $stmt = $this->con->prepare($strInsertQry);
         $stmt->bind_param("sss",$roomno, $status,$prefix);
         $result = $stmt->execute();
         $stmt->close();
         if($result){
             return true;
         }
         return false;
     }
 
     public function update_Room($roomId,$roomno,$prefix){
        $status=0;
         $strInsertQry="update rooms set roomno=?, status =?, prefix=? "
             ." where id=?";
         $stmt = $this->con->prepare($strInsertQry);
         $stmt->bind_param("sssi",$roomno, $status,$prefix,$roomId);
         $result = $stmt->execute();
         $stmt->close();
       return $result;// $num_affected_rows>=0;
 
     }
     public function room_Check($roomno,$prefix)
     {
             $sql = "SELECT * FROM rooms where prefix='".$prefix."' and roomno='".$roomno."'";
             $result = $this->con->query($sql);
             $this->con->close();
             return $result;
     }
     public function room_dataById($id)
     {
             $sql = "SELECT * FROM rooms where id=$id";
             $result = $this->con->query($sql);
             $this->con->close();
             return $result;
     }
    public function updateLogin($userId,$oldPassword, $Password){
        $strInsertQry="update login_details set password=? where password=? and id=?";
        $stmt = $this->con->prepare($strInsertQry);
        $stmt->bind_param("ssi",$Password, $oldPassword, $userId);
        $result = $stmt->execute();
        $stmt->close();
      return $result;// $num_affected_rows>=0;

    }

    public function user_loginCheck($userId,$oldPassword)
    {
            $sql = "SELECT * FROM login_details where id=$userId and password='".$oldPassword."'";
            $result = $this->con->query($sql);
            $this->con->close();
            return $result;
    }


    public function ListRoom_Bookings()
    {
            $sql = "SELECT * FROM bookings";
            $result = $this->con->query($sql);
            $this->con->close();
            return $result;
    }
    public function List_analytics($sql)
    {
            
            $result = $this->con->query($sql);
            $response=array();
             $response['datas']=array();
            $tempData=array();
            $tempData['results']=array();
           do
           {
           // Store first result set
            if ($result=mysqli_store_result($this->con))
              {
                $tempData['results']=$result->fetch_all(MYSQLI_ASSOC);
                mysqli_free_result($result);
                array_push($response,$tempData['results']);
              }
            }
             while (mysqli_next_result($this->con));

return  $response;
            $response["data"]=$result->fetch_all(MYSQLI_ASSOC);
            mysqli_free_result($result);
            mysqli_next_result($this->con);
            $result2 = mysqli_use_result($this->con);
            
             $response["data2"]=$result2->fetch_all(MYSQLI_ASSOC);
             
             mysqli_free_result($result2);
             mysqli_next_result($this->con);
            $result2 = mysqli_use_result($this->con);
            $response["data3"]=$result2->fetch_all(MYSQLI_ASSOC);
            
            mysqli_free_result($result2);
            mysqli_next_result($this->con);
           $result2 = mysqli_use_result($this->con);
           $response["data4"]=$result2->fetch_all(MYSQLI_ASSOC);
            
           mysqli_free_result($result2);
           mysqli_next_result($this->con);
          $result2 = mysqli_use_result($this->con);
          $response["data5"]=$result2->fetch_all(MYSQLI_ASSOC);
           
          
             $this->con->close();
             
            return $response;
    }
    public function ListRoom_Bookings_info($location,$startDate,$endDate)
    {
        $locationQry="";
        if($location!='')
        {
            if($location!="All")
                $locationQry="rooms.prefix='".$location."' and ";
        }   
        
        if($startDate=='' )
        {
            $resultMin = $this->con->query("select Date(min(start_date)) as start_date from bookings");
            $startDateArray=$resultMin->fetch_all(MYSQLI_ASSOC);
            $startDate=$startDateArray[0]['start_date'];
        }
        if($endDate=='' )
        {
            $resultMax = $this->con->query("select Date(max(end_date)) as end_date from bookings");
            $endDateArray=$resultMax->fetch_all(MYSQLI_ASSOC);
            $endDate=$endDateArray[0]['end_date'];
        }
        if($startDate!='' && $endDate!='')
           $sql = "SELECT *,CONCAT(bookings.No_of_guests,'(M: ',bookings.No_of_male,' F: ',bookings.No_of_female,')') as noGuests FROM bookings inner join rooms on rooms.id=bookings.room where  ".$locationQry." 
           ('".$startDate."' <=Date(bookings.start_date) and '".$endDate."' >=Date(bookings.end_date)) or
           ('".$startDate."' <= Date(bookings.start_date) and '".$endDate."'<= Date(bookings.end_date) and '".$endDate."'>=Date(bookings.start_date)) or
           ('".$startDate."'>= Date(bookings.start_date) and '".$endDate."' <= Date(bookings.end_date)) or
           ('".$startDate."' <=Date(bookings.end_date) and '".$endDate."' >=Date(bookings.end_date)) ";

        //   else if($startDate!='' ){
        //     $sql = "SELECT *,CONCAT(bookings.No_of_guests,'(M: ',bookings.No_of_male,' F: ',bookings.No_of_female,')') as noGuests FROM bookings inner join rooms on rooms.id=bookings.room where  ".$locationQry."  DATE(start_date)>='".$startDate."'";
            
        //   } 
        //   else if($endDate!='' ){
        //     $sql = "SELECT *,CONCAT(bookings.No_of_guests,'(M: ',bookings.No_of_male,' F: ',bookings.No_of_female,')') as noGuests FROM bookings inner join rooms on rooms.id=bookings.room where  ".$locationQry."  DATE(start_date)<='".$endDate."'";
            
        //   } 
           $result = $this->con->query($sql);
            $this->con->close();
            return $result;
    }

    public function user_login($username, $password)
    {
            $sql = "SELECT * FROM login_details where username='".$username."' and password='".$password."'";
            $result = $this->con->query($sql);
            $this->con->close();
            return $result;
    }
    public function ListRoom()
    {
            $RoomListsql = "SELECT id,roomno, id as value,concat(prefix,'-',roomno) as label,prefix,type,status FROM rooms order by prefix,roomno";
            $result = $this->con->query($RoomListsql);
            $this->con->close();
            return $result;
    }
    public function List_Disctinct_Prefix()
    {
            $RoomListsql = "SELECT Distinct(prefix) as prefix From rooms order by prefix";
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
    public function delete_rooms($id){
        $strInsertQry="delete from rooms where id = ?";

        $stmt = $this->con->prepare($strInsertQry);
        $stmt->bind_param("i",$id );

        $stmt->execute();
        $num_affected_rows = $stmt->affected_rows;
        $stmt->close();

       return $num_affected_rows;

       

if($num_affected_rows > 0)
        return "true";
        else
            return "false";
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