import Link from "next/link";

import { ArrowIcon } from "@/components/icons";
import { LOCATION, type Role } from "@/content/careers";

// One row per role: title, location and an arrow, the whole row a link.
export function RoleList({ roles }: { roles: Role[] }) {
  return (
    <ul className="role-list">
      {roles.map((role) => (
        <li key={role.slug}>
          <Link href={`/careers/${role.slug}`} className="role-row">
            <span className="role-title">{role.title}</span>
            <span className="role-meta">{LOCATION}</span>
            <span className="role-go" aria-hidden>
              <ArrowIcon size={16} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
