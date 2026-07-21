import Container from "@/components/Container";

export default function TechStack() {
  return (
    <section
      id="stack"
      className="py-32"
    >
      <Container>

        <h2 className="text-5xl font-bold">
          Tech Stack
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl border p-8 h-72">
            AI
          </div>

          <div className="rounded-3xl border p-8 h-72">
            Frontend
          </div>

          <div className="rounded-3xl border p-8 h-72">
            Backend
          </div>

          <div className="rounded-3xl border p-8 h-72">
            Tools
          </div>

        </div>

      </Container>
    </section>
  );
}