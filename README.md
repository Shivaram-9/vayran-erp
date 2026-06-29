# VAYRAN ERP

Welcome to **VAYRAN ERP**, a comprehensive, enterprise-grade Next.js application designed to centralize and automate your company's core operations. 

Built with scalability, performance, and user experience in mind, VAYRAN ERP consolidates Human Resources, Finance, Procurement, Inventory, Project Management, and Workflow Automation into a single, seamless platform.

## 🚀 Key Modules

- **Company & Organization**: Manage multiple branches, business units, departments, and visualize your organizational structure through interactive charts.
- **Human Resources (HRMS)**: Complete employee lifecycle management, attendance tracking, leave requests, and a self-service employee portal.
- **Finance & Accounting**: Robust accounts payable/receivable, expense tracking, and real-time budgeting dashboards.
- **Inventory & Procurement**: Multi-warehouse stock management, supplier coordination, and automated purchase order generation.
- **Project Management**: Kanban boards, time tracking, and resource allocation for seamless delivery.
- **Workflow Automation**: An interactive drag-and-drop Flow Designer to create cross-module automation state-machines and manage Service Level Agreements (SLAs).
- **Administration & Security**: Granular Role-Based Access Control (RBAC), audit logs, and global system health monitoring.

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: Modern, responsive, glassmorphism UI with vanilla CSS variables and Tailwind principles.
- **Icons**: Lucide React / Custom SVG library
- **Interactive UI**: Custom Drag-and-Drop builder powered by React Flow.

## ⚙️ Getting Started (Local Development)

### Prerequisites
- Node.js (v18.17 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shivaram-9/vayran-erp.git
   cd vayran-erp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize the Database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ☁️ Deployment

The easiest way to deploy VAYRAN ERP is to use the [Vercel Platform](https://vercel.com/new). 

> **Important**: When deploying to Vercel or any serverless platform, you must migrate the `dev.db` SQLite database to a cloud Postgres instance (like Neon or Supabase) and update the `schema.prisma` provider to `postgresql`. Serverless functions do not support local SQLite files persistently.

## 📝 License
Proprietary / Confidential. All rights reserved.
