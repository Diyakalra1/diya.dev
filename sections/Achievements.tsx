import Container from "@/components/Container";

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="py-32"
    >
      <Container>

        <h2 className="text-5xl font-bold">
          Achievements
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl border h-56"></div>

          <div className="rounded-3xl border h-56"></div>

          <div className="rounded-3xl border h-56"></div>

          <div className="rounded-3xl border h-56"></div>

        </div>

      </Container>
    </section>
  );
}