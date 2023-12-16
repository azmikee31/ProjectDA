import React from "react";
import { FiPhoneCall, FiMapPin, FiMail } from "react-icons/fi";
import Head from "../Components/Head";
import Layout from "../Layout/Layout";

function ContactUs() {
  const ContactData = [
    {
      id: 1,
      title: "Email Us",
      info: "Interactively grow backend ideas for cross-platform models.",
      icon: FiMail,
      contact: "alonecoding.com",
    },
    {
      id: 2,
      title: "Call Us",
      info: "Distinctively exploit optimal alignments for intuitive bandwidth.",
      icon: FiPhoneCall,
      contact: "+84 328 461 516",
    },
    {
      id: 3,
      title: "Location",
      info: "39 Tran Dinh Tri Street, Hoa Minh, Danang city",
      icon: FiMapPin,
      contact: "",
    },
  ];
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="Contact Us" />
        <div className="grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
          {ContactData.map((item) => (
            <div
              key={item.id}
              className="border border-border flex-colo p-10 bg-dry rounded-lg text-center"
            >
              <span className="flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl">
                <item.icon />
              </span>
              <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
              <p className="mb-0 text-sm text-text leading-7">
                <a href={`mailto:${item.contact}`} className="text-blue-600">
                  {item.contact}
                </a>{" "}
                {item.info}
              </p>
            </div>
          ))}
          {/* <form
            action="http://localhost:8888/order/create_payment_url"
            method="post"
          >
            <input style={{ color: "black" }} type="number" name="amount" />
            <input type="hidden" name="language" value="vn" />
            <input type="hidden" name="bankCode" value="VNBANK" />
            <button style={{ backgroundColor: "red" }}>
              Thanh toan online
            </button>
          </form> */}
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;
