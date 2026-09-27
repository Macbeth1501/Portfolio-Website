import { ProjectForm } from "../ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Add project</h1>
      <ProjectForm />
    </div>
  );
}
