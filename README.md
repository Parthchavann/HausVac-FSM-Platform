# HausVac FSM Platform

A modern AI-powered field service management (FSM) platform with cloud CRM, quoting, scheduling, and invoicing—built using Next.js, Tailwind CSS, and Supabase. 

- **Frontend:** React (Next.js App Router), Tailwind CSS, ShadCN/UI, Lucide icons
- **Backend:** Supabase (PostgreSQL, Auth, Edge Functions), Groq/TogetherAI for AI quotes
- **Features:** Modular CRM, instant AI quotes, cloud scheduling/invoicing, full Supabase integration

## 🚀 Features

- **CRM:** Manage customer data with live Supabase storage (PostgreSQL)
- **Quoting:** Generate instant service quotes with AI (LLM via Groq or TogetherAI API)
- **Scheduling:** Schedule jobs (demo slot, cloud-ready)
- **Invoicing:** Mark invoices as paid (demo, cloud-ready)
- **Modern UI:** Responsive, beautiful design with Next.js + Tailwind
- **Cloud backend:** All data securely stored and synced in Supabase

## 🛠️ Getting Started

1. **Clone the repo:**
    ```bash
    git clone https://github.com/your-username/hausvac-fsm.git
    cd hausvac-fsm
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**  
   Create a `.env.local` file in the root folder:
    ```
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    GROQ_API_KEY=your_groq_or_ai_key
    ```

4. **Start the development se**
