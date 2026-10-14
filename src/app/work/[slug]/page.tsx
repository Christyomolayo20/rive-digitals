import { redirect } from "next/navigation";

export default function WorkDetailRedirect({ params }: { params: { slug: string } }) {
  redirect(`/portfolio/${params.slug}`);
}
