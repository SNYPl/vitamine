import React from "react";
import style from "./style.module.scss";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCartItemsGlobal } from "@/store/slices/cartSlice";

type Inputs = {
  username: string;
  familyName: string;
  country: string;
  city: string;
  street: string;
  number: number;
  email: string;
  textareaField: string;
};

interface billingProps {
  setStepCart: (step: string) => void;
}

const Billing: React.FC<billingProps> = ({ setStepCart }) => {
  const dispatch = useDispatch();
  const cartUpdatedList = useSelector(
    (state: any) => state.cartReducer.cartItems
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post("/api/cart/order/post", {
        products: cartUpdatedList,
        Shipping: data,
      });

      if (response.status === 200 && response.data === "order sented") {
        localStorage.removeItem("cartItems");
        dispatch(setCartItemsGlobal([]));
        setStepCart("step-3");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <section className={style.billing}>
      <h2>ანგარიშსწორება და მიწოდება</h2>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={`${style.contactForm}`}
      >
        <article className={`${style.nameInputs}`}>
          <div className={`${style.input}`}>
            <label htmlFor="username">სახელი</label>
            <input
              type="text"
              placeholder="სახელი"
              id="username"
              {...register("username", {
                required: {
                  value: true,
                  message: "გრაფა ცარიელია",
                },
              })}
              style={{ border: errors.username ? "1px solid red" : "" }}
            />
          </div>
          <div className={`${style.input}`}>
            <label htmlFor="username">გვარი</label>
            <input
              type="text"
              placeholder="გვარი"
              id="familyName"
              {...register("familyName", {
                required: {
                  value: true,
                  message: "გრაფა ცარიელია",
                },
              })}
              style={{ border: errors.familyName ? "1px solid red" : "" }}
            />
          </div>
        </article>

        <div className={`${style.input} ${style.selector}`}>
          <label htmlFor="country">ქვეყანა</label>
          <select
            {...register("country")}
            id="country"
            style={{ border: errors.country ? "1px solid red" : "" }}
          >
            <option value="Georgia">საქართველო</option>
          </select>
        </div>
        <div className={`${style.input} ${style.selector}`}>
          <label htmlFor="city">ქალაქი</label>
          <select
            {...register("city")}
            id="city"
            style={{ border: errors.city ? "1px solid red" : "" }}
          >
            <option value="Tbilisi">თბილისი</option>
          </select>
        </div>

        <div className={`${style.input}`}>
          <label htmlFor="street">ქუჩის მისამართი</label>
          <input
            type="text"
            placeholder="სახლის ნომერი და ქუჩის სახელი"
            id="street"
            {...register("street", {
              required: {
                value: true,
                message: "გრაფა ცარიელია",
              },
            })}
            style={{ border: errors.street ? "1px solid red" : "" }}
          />
        </div>

        <div className={`${style.input}`}>
          <label htmlFor="number">ტელეფონი</label>
          <input
            type="number"
            placeholder="ტელეფონი"
            id="number"
            {...register("number", {
              required: {
                value: true,
                message: "გრაფა ცარიელია",
              },
            })}
            style={{ border: errors.number ? "1px solid red" : "" }}
          />
        </div>
        <div className={`${style.input}`}>
          <label htmlFor="email">ელ.ფოსტის მისამართი</label>
          <input
            type="email"
            placeholder="ელ.ფოსტა"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "გრაფა ცარიელია",
              },
            })}
            style={{ border: errors.email ? "1px solid red" : "" }}
          />
        </div>

        <article className={`${style.moreInfo}`}>
          <h2>დამატებითი ინფორმაცია</h2>
          <p>შეკვეთის დეტალები (სურვილისამებრ)</p>
          <div className={`${style.input}`}>
            <Controller
              name="textareaField"
              control={control}
              defaultValue=""
              render={({ field }) => <textarea {...field} />}
            />
          </div>
        </article>
        <article className={style.btnContainers}>
          <button
            className={style.btnInf}
            onClick={() => setStepCart("step-1")}
          >
            უკან დაბრუნება
          </button>
          <button type="submit" className={style.btnInf}>
            გადახდა
          </button>
        </article>
      </form>
    </section>
  );
};

export default Billing;
