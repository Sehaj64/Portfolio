export const portfolioData = {
  name: "Sehaj Kumar",
  title: "AI & Data Engineer | GenAI & Agentic Workflows | Data Pipelines",
  email: "sehajpk3456@gmail.com",
  location: "Panipat, India",
  github: "https://github.com/Sehaj64",
  linkedin: "https://www.linkedin.com/in/sehaj-kumar-639448136/",
  summary: "Results-driven AI & Data Engineer specializing in building scalable Generative AI applications, agentic workflows, and robust data pipelines. Proven track record of leveraging LLMs (Gemini, OpenAI) and advanced data modeling to automate complex business processes and deliver high-impact engineering solutions.",
  
  skills: [
    {
      category: "Data Analysis & BI",
      items: ["SQL (Window Functions, CTEs)", "Tableau", "Power BI", "Excel (Advanced)", "Pandas", "NumPy", "Data Visualization", "Dashboard Development", "KPI Tracking"]
    },
    {
      category: "Programming",
      items: ["Python (ML, Automation)", "R (Statistical Analysis)", "HTML/CSS", "TypeScript", "Next.js"]
    },
    {
      category: "Database & ETL",
      items: ["MySQL", "PostgreSQL", "SQLite", "Data Warehousing", "Data Cleaning", "ETL Pipelines", "Database Optimization", "Data Integration"]
    },
    {
      category: "Analytics & Modeling",
      items: ["EDA", "Regression Analysis", "Statistical Modeling", "Predictive Analytics", "A/B Testing", "Forecasting", "Data Mining", "Trend Analysis"]
    }
  ],

  projects: [
    {
      id: "skillproof-ai",
      title: "SkillProof AI: Claim-to-Proof Agent",
      shortDescription: "Agentic AI talent assessment engine built for Deccan AI Catalyst 2026 Hackathon, verifying technical proficiency through conversational proof.",
      tech: ["Python", "Gemini 1.5 Pro", "Streamlit", "Agentic AI"],
      metrics: {
        event: "Deccan AI Catalyst 2026",
        accuracy: "Architect-level Scenarios"
      },
      content: {
        executiveSummary: "Developed 'SkillProof AI', a production-minded talent assessment engine that conversationally assesses real proficiency, identifies gaps, and generates personalized learning plans.",
        businessProblem: "Manual resume screening is expensive and often inaccurate, relying on 'vibe-checks' rather than actual technical proof.",
        myRole: "Lead Developer / AI Architect",
        dataset: "Unstructured Resumes and Job Descriptions mapped to Seniority-based complexity levels.",
        solutionArchitecture: "Agentic AI framework using Gemini 1.5 Pro as a Technical Architect to conduct deep-dive technical interviews.",
        dataFlow: "Upload JD/Resume -> Domain Detection -> Technical Interviewer Agent -> Answer Auditing -> Claim-to-Proof Ledger Generation.",
        keyFeatures: ["Relative Difficulty Logic", "Claim-to-Proof Ledger", "Zero-to-Expert Learning Roadmaps", "Seniority Detector"],
        results: "Replaces traditional 1st-round technical screening with a rigorous, evidence-backed automated ledger.",
        limitations: "Heavily dependent on Gemini API latency and token window for long interviews.",
        nextSteps: "Integrate specialized agents for niche domains like CyberSec or VLSI.",
        links: {
          github: "https://github.com/Sehaj64/SkillProof-",
          demo: "https://aiagent0.streamlit.app/"
        }
      }
    },
    {
      id: "ai-recruiter",
      title: "AI Recruiter Platform",
      shortDescription: "GenAI-powered recruitment automation system reducing screening time by 40% using Google Gemini API.",
      tech: ["Python", "Streamlit", "Gemini API", "NLP"],
      metrics: {
        efficiency: "40% reduction in screening time",
        accuracy: "95% data accuracy in profiling"
      },
      content: {
        executiveSummary: "Architected a full-stack automated hiring platform that leverages Generative AI (Google Gemini) to conduct natural language analysis of candidate profiles.",
        businessProblem: "Manual resume screening is a major bottleneck in recruitment, often taking days and suffering from inconsistency.",
        myRole: "Lead AI Engineer",
        dataset: "500+ unstructured applicant profiles parsed into structured JSON format.",
        solutionArchitecture: "Python backend with Gemini API for semantic analysis and Streamlit for the executive dashboard.",
        dataFlow: "Resume Upload -> SpaCy Entity Extraction -> Gemini Semantic Analysis -> Scoring Algorithm -> Rank Visualization.",
        keyFeatures: ["Natural language Q&A with resumes", "Dynamic relevance scoring", "Automated keyword matching"],
        results: "Streamlined recruitment for HR teams, enabling instant identification of top-tier talent.",
        limitations: "Requires high-quality PDF text extraction for optimal Gemini performance.",
        nextSteps: "Integrate vector databases (Pinecone) for better long-term candidate memory.",
        links: {
          github: "https://github.com/Sehaj64/Ai-Recruiter",
          demo: "https://ai-recruiter-jyxktjvdryf6ercxxthr7n.streamlit.app/"
        }
      }
    },
    {
      id: "salary-prediction",
      title: "Salary Prediction System",
      shortDescription: "Full-stack ML application for salary range forecasting with 92% prediction accuracy.",
      tech: ["Python", "Scikit-learn", "Flask", "Pandas"],
      metrics: {
        accuracy: "92% prediction accuracy",
        model: "Random Forest Regressor"
      },
      content: {
        executiveSummary: "Developed a predictive modeling system to forecast salary ranges based on experience, demographics, and market data.",
        businessProblem: "Inconsistent salary offerings leading to budget overruns or loss of talent to competitors.",
        myRole: "Data Scientist",
        dataset: "10,000+ employee records including roles, years of experience, and location.",
        solutionArchitecture: "Random Forest Regressor served via a Flask REST API with a responsive frontend.",
        dataFlow: "User Input -> Flask API -> Model Inference -> Real-time Prediction Output.",
        keyFeatures: ["Real-time prediction engine", "Feature importance analysis", "Interactive web interface"],
        results: "Achieved 92% accuracy, providing a robust tool for HR budget planning.",
        limitations: "Limited to the features available in the training dataset (demographics vs performance).",
        nextSteps: "Incorporate real-time job board data scraping.",
        links: {
          github: "https://github.com/Sehaj64/Salary-Prediction",
          demo: "https://salarypredictionmain.streamlit.app/"
        }
      }
    },
    {
      id: "ipl-auction-strategy",
      title: "IPL Auction Strategy Dashboard",
      shortDescription: "Interactive BI dashboard identifying undervalued player categories using SQL Window Functions.",
      tech: ["SQL", "Tableau", "Python", "Streamlit"],
      metrics: {
        seasons: "15+ Seasons Analyzed",
        roi: "3 Undervalued categories identified"
      },
      content: {
        executiveSummary: "Analyzed 15+ years of IPL match data to discover undervalued player profiles and optimize team auction spending.",
        businessProblem: "Franchises often overpay for celebrity names while missing high-ROI players due to lack of granular performance analysis.",
        myRole: "Data Analyst",
        dataset: "Ball-by-ball match data and historical auction pricing (2008-2024).",
        solutionArchitecture: "SQL-heavy transformation layer feeding a Streamlit and Tableau visualization suite.",
        dataFlow: "Raw CSVs -> SQL Aggregation -> ROI Metric Calculation -> Dashboard Viz.",
        keyFeatures: ["Custom performance-to-cost KPIs", "Player comparison engine", "Team spending efficiency tracking"],
        results: "Provided a data-backed roadmap for auction investment, highlighting peak performance trends.",
        limitations: "Historical data may not account for current player fitness or pitch conditions.",
        nextSteps: "Integrate Monte Carlo simulations for auction bidding wars.",
        links: {
          github: "https://github.com/Sehaj64/IPL-Auction-Strategy",
          demo: "https://ipl-auction-strategy-ucvtltbj2shjqfiwlfka44.streamlit.app/"
        }
      }
    },
    {
      id: "sales-dashboard",
      title: "Sales Performance & KPI Dashboard",
      shortDescription: "Executive BI dashboard visualizing complex sales KPIs across multiple regions and product categories.",
      tech: ["Tableau", "Power BI", "SQL", "Excel"],
      metrics: {
        scope: "Global Sales Data",
        impact: "Executive-level Insights"
      },
      content: {
        executiveSummary: "Designed and deployed interactive Tableau and Power BI dashboards to visualize complex sales KPIs for stakeholders.",
        businessProblem: "Fragmented sales data across regions made it difficult to identify global trends and seasonal patterns.",
        myRole: "Data Analyst",
        dataset: "Multi-regional transactional sales data including product categories and time periods.",
        solutionArchitecture: "SQL-based data modeling layer feeding interactive Tableau and Power BI visualizations.",
        dataFlow: "Raw Transactions -> SQL Aggregated Views -> BI Semantic Layer -> Dashboard.",
        keyFeatures: ["Regional performance tracking", "Seasonal trend analysis", "Product category deep-dives"],
        results: "Enabled data-driven decision-making for executives by providing a unified view of quarterly targets and performance.",
        limitations: "Depends on the refresh rate of the underlying transactional databases.",
        nextSteps: "Automate data refresh using cloud-based ETL pipelines (Azure/AWS).",
        links: {
          github: "#",
          demo: "#"
        }
      }
    },
    {
      id: "churn-analysis",
      title: "Customer Churn Analysis & Retention",
      shortDescription: "Strategic data analysis identifying key user churn patterns and retention strategies.",
      tech: ["Python", "Pandas", "Tableau", "SQL"],
      metrics: {
        insight: "Identified top 3 churn drivers",
        data: "1M+ Records Processed"
      },
      content: {
        executiveSummary: "Conducted deep-dive analysis into customer churn data to identify behavioral patterns and recommend retention strategies.",
        businessProblem: "High customer attrition rates impacting long-term revenue and market share.",
        myRole: "Data Analyst",
        dataset: "Cleaned customer transactional and behavioral data (1M+ rows).",
        solutionArchitecture: "Pandas-based EDA layer with Tableau visualization for executive reporting.",
        dataFlow: "Raw Data -> Cleaning/ETL -> Behavioral Segmentation -> Dashboard Reporting.",
        keyFeatures: ["Churn driver identification", "User segmentation analysis", "Strategic retention roadmap"],
        results: "Identified critical churn triggers, enabling marketing teams to target at-risk users proactively.",
        limitations: "Model is descriptive; requires transition to predictive for real-time alerting.",
        nextSteps: "Implement an XGBoost classifier for churn prediction.",
        links: {
          github: "https://github.com/Sehaj64/Churn-analysis",
          demo: "https://public.tableau.com/app/profile/sehaj.kumar/viz/Churncomplete/ChurnAnalysisDashboard"
        }
      }
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology in AI & Data Science",
      institution: "Chandigarh Group of Colleges, Mohali",
      period: "2021 – 2025",
      metrics: "CGPA: 7.74/10.0"
    }
  ],

  certifications: [
    {
      name: "Post Graduate Certificate in Data Science",
      issuer: "Internshala",
      date: "Dec 2024",
      url: "#"
    },
    {
      name: "Deep Learning with Python and PyTorch",
      issuer: "Udemy",
      date: "April 2025",
      url: "#"
    }
  ]
};
