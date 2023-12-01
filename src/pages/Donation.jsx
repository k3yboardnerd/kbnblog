// import { Link, useNavigate } from "react-router-dom"
import Logo from "../components/Logo"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { toast } from "react-toastify"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { AiFillHeart } from "react-icons/ai"
// import { HiOutlineHeart } from 'react-icons/hi'
import { useDonateMutation } from "../features/donations/donationApiSlice"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { removeSubscriber } from "../features/subscribers/subscriptionSlice"
import { Footer } from "../components/Footer"
import { SubscribeCard } from "../components/SubscribeCard"

export default function Donation() {
  const [amount, setAmount] = useState(0)
  const { subscriberInfo } = useSelector((state) => state.subscriber)
  const [donate] = useDonateMutation()
  const dispatch = useDispatch()

  return (
    <div className="m-auto space-y-12 py-20 px-4 max-w-screen-sm ">
      <Logo className="text-8xl font-sans font-black text-violet-800 m-auto text-center" />
      <AiFillHeart className="text-6xl m-auto text-violet-600 animate-bounce" />
      <h1 className="text-slate-700 text-3xl font-sans font-bold text-center">A Giving Hand Is A Blessed Hand!</h1>
      <ToastContainer />
      {
        subscriberInfo ?
        <div className="bg-white rounded-lg p-4 shadow-xl flex flex-col w-full space-y-4 max-w-md m-auto">
          <div className="flex flex-col space-y-4">
            <label className="font-medium font-sans text-slate-600 px-1" htmlFor="amount">Amount</label>
            <input onChange={(e) => setAmount(parseFloat(e.target.value))} value={amount === 0 ? "" : amount} placeholder="" className="ring-2 ring-violet-400 rounded-md p-2 w-[98%] self-center my-2 hover:ring-violet-600 focus:ring-violet-800 " type="number" name="amount" required id="amount" autoComplete="off" />
          </div>
          <PayPalButtons
            key={amount}
            style={{
              color: 'silver',
              label: 'donate'
            }}

            onClick={() => {
              if (amount === 0 || amount < 1) {
                alert("You can donate from as little as $1.00.")
              }
            }}

            createOrder={(data, actions) => {

              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: amount.toFixed(2),
                    breakdown: {
                      item_total: {
                        value: amount.toFixed(2),
                        currency_code: 'USD'
                      }
                    }
                  },
                  description: `${subscriberInfo.username} Donation`,
                  items: [{
                    category: "DONATION",
                    name: "KBN DONATION",
                    description: "KBN Support donation to keep kbn up and running.",
                    quantity: '1',
                    unit_amount: {
                      value: amount.toFixed(2),
                      currency_code: 'USD'
                    }

                  }]
                }],
              })
            }}

            onApprove={async (data, actions) => {
              await actions.order.capture()
              const res = await donate({ subscriberId: subscriberInfo._id, amount }).unwrap()
              setAmount(0)
              alert(res.message)
              dispatch(removeSubscriber())
              window.history.back()
            }}

            onError={(err) => {
              alert(err)
              alert("Please make sure the amount is filled, let's try again!")
            }}

            onCancel={() => {
              alert('Even $0.10 is appriciated!')
            }}
          />
          {/* <button className="bg-violet-600 ring-4 ring-transparent hover:bg-violet-800 focus:bg-violet-950 active:bg-violet-950 focus:ring-violet-600 text-lg flex items-center justify-center py-2 px-1 rounded-lg font-semibold tracking-wide gap-2 text-violet-100 self-center w-[98%]" type="submit">{isLoading ? <AiOutlineReload className="animate-spin text-2xl m-1" /> : <>Donate<HiOutlineHeart /></>}</button> */}
          </div>
          :
          <div className="flex flex-col items-center pt-20 px-2 space-y-2">
            <h1 className="text-lg font-sans font-black">Please subscribe or login and donate.</h1>
            <SubscribeCard />
          </div>
      }
      <Footer />
    </div>
  )
}
