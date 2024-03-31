import Swal from 'sweetalert2'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { findUser } from "../features/userSlice"
import instance from '../config'

export default function Profile(){
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.user.value)

  useEffect(()=>{
    dispatch(findUser())
  }, [])

  async function handlerPayment(){
    try {
      let {data} = await instance({method:'post', url:'/payment',
        headers:{
          Authorization:`Bearer ${localStorage.access_token}`
        }
      });

      window.snap.pay(data.token, {
        onSuccess: async function(result) {
          // Update user's subscription to "premium" on successful payment
          try {
            await instance.put('/payment/success', {}, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
            });

            // Add any additional logic needed after successful payment
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Payment success!",
              showConfirmButton: false,
              timer: 1500
            });
            dispatch(findUser())
            console.log(result);
          } catch (error) {
            console.log(error);
          }
        },
        onPending: function(result) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Waiting for your payment!",
            showConfirmButton: false,
            timer: 1500
          });
          console.log(result);
        },
        onError: function(result) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment failed!",
            showConfirmButton: false,
            timer: 1500
          });
          console.log(result);
        },
        onClose: function() {
          Swal.fire({
            position: "center",
            icon: "success",
            title: 'You closed the popup without finishing the payment',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    } catch (error) {
      console.log(error,'<-error payment');
    }
  }

    return(
        <>
        <div style={{display:'flex', justifyContent:'center', fontFamily:'cursive'}}>
            <div style={{marginTop:'100px',margin:'10px 0px'}}>
                <center>
                    <h2>{user.username}</h2>
                    <img src={user.imageUrl!=='-' ? user.imageUrl:'https://cdn-icons-png.flaticon.com/512/149/149071.png'} style={{width:'200px', borderRadius:'50%'}} />
                    <h3>{user.status}</h3>
                    {
                      user.status==='regular' && <button className="btn btn-primary" onClick={handlerPayment}>Go Premium</button>
                    }
                </center>
            </div>
        </div>
        </>
    )
}