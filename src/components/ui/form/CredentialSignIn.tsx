// import { redirect } from "next/navigation";

// import { signIn } from "@/auth";

// export default function CredentialsSignIn() {
//     return (
//         <form
//             className="flex flex-col gap-4 *:border *:border-white *:p-2"
//             action={async (formData) => {
//                 "use server";
//                 try {
//                     console.log(formData);
//                     const data = {
//                         email: formData.get("email"),
//                         password: formData.get("password"),
//                     };
//                     console.log(data);
//                     await signIn("credentials", data);
//                     console.log("redirecting");
//                     redirect("/profile");
//                 } catch (error) {}
//             }}
//         >
//             <input name="email" type="email" placeholder="email" />
//             <input name="password" type="password" placeholder="password" />

//             <button>Sign In</button>
//         </form>
//     );
// }
