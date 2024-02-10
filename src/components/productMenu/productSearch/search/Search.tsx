"use client";
import styles from "./style.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type Inputs = {
  search: string;
};

const Search = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.push(`/shop?search=${data.search}`);
  };

  return (
    <section className={styles.search}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.contactForm}`}
      >
        <input
          type="text"
          placeholder="მოეძებნე პროდუქცია"
          {...register("search", {
            required: {
              value: true,
              message: "გრაფა ცარიელია",
            },
          })}
        />

        <button type="submit">ძებნა</button>
      </form>
    </section>
  );
};

export default Search;
