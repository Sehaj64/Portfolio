export interface PortfolioProject {
  id: string; title: string; shortDescription: string; tech: string[];
  metrics: Record<string, string>;
  image: { src: string; alt: string; caption: string } | null;
  content: { executiveSummary: string; businessProblem: string; myRole: string; dataset: string;
    solutionArchitecture: string; dataFlow: string; keyFeatures: string[]; results: string;
    limitations: string; nextSteps: string;
    links: { github: string; demo: string; demoLabel: string };
  };
}

const data: {
  name: string; title: string; email: string; github: string; linkedin: string; summary: string;
  skills: { category: string; items: string[] }[];
  projects: PortfolioProject[];
  education: { degree: string; institution: string; period: string; metrics: string }[];
  certifications: { name: string; issuer: string; date: string }[];
} = {
  "name": "Sehaj Kumar",
  "title": "Data Analytics, Business Intelligence & Automation",
  "email": "sehaj.kumar.work@gmail.com",
  "github": "https://github.com/Sehaj64",
  "linkedin": "https://www.linkedin.com/in/sehaj-kumar-639448136/",
  "summary": "I help teams organize data, automate recurring reports and understand business performance. My projects explore retail profitability, customer churn, complaint patterns and AI-assisted workflows.",
  "skills": [
    {
      "category": "Analytics & BI",
      "items": [
        "Power BI",
        "DAX",
        "Power Query",
        "Tableau / Tableau Prep",
        "Excel PivotTables",
        "KPI reporting"
      ]
    },
    {
      "category": "Python & Automation",
      "items": [
        "Python",
        "Pandas",
        "NumPy",
        "Flask APIs",
        "n8n",
        "Streamlit"
      ]
    },
    {
      "category": "SQL & Data Quality",
      "items": [
        "SQLite",
        "Joins, CTEs and window functions",
        "Data cleaning and reconciliation",
        "Star-schema modeling",
        "Methodology documentation",
        "Git / GitHub"
      ]
    },
    {
      "category": "ML & Generative AI",
      "items": [
        "scikit-learn",
        "Random Forest regression",
        "Train/test separation",
        "R-squared and MSE",
        "Gemini API",
        "LLM workflow prototypes"
      ]
    }
  ],
  "projects": [
    {
      "id": "consumer-complaint-analysis",
      "title": "Consumer Complaints & Response Performance",
      "shortDescription": "Where are complaints concentrated, and which response delays need closer investigation? A Power BI report built from public CFPB data.",
      "tech": [
        "Power BI",
        "DAX",
        "Power Query",
        "Data Modeling"
      ],
      "metrics": {
        "dataset": "62,516 complaints",
        "finding": "2,403 untimely responses"
      },
      "image": {
        "src": "/projects/consumer-complaints.png",
        "alt": "Power BI report filtered to Midwest credit-reporting complaints, showing 804 complaints and a 5.22% untimely-response rate.",
        "caption": "Actual Power BI report • Midwest / credit reporting • 804 of 62,516 complaints. The original report labels untimely responses as SLA breaches; these are not independently verified contractual breaches."
      },
      "content": {
        "executiveSummary": "Where are complaints concentrated, and which response delays need closer investigation? A Power BI report built from public CFPB data.",
        "businessProblem": "Complaint totals alone do not show which products, regions and recurring issues deserve closer review.",
        "myRole": "Independent portfolio project: data preparation, implementation and documentation.",
        "dataset": "62,516 unique public complaints across nine product categories. This is an independent project, not work performed for American Express.",
        "solutionArchitecture": "Power Query prepares the source data. Calendar and geography dimensions support filtering; DAX calculates monthly comparisons and a rolling average of daily untimely-response rates.",
        "dataFlow": "Public complaint data → Power Query → data model → DAX measures → interactive report.",
        "keyFeatures": [
          "Product and region filters",
          "Prior-month comparisons",
          "30-day average of daily untimely-response rates",
          "Response and monetary-relief summaries"
        ],
        "results": "Two issue categories account for 1,838 of 2,736 debt-collection complaints (67.18%). The featured Midwest credit-reporting view contains 804 complaints, 42 untimely responses (5.22%) and 30 monetary-relief outcomes.",
        "limitations": "Complaint patterns do not establish regulatory violations or root causes. The screenshot shows a filtered segment, not the full dataset. Configured RLS roles have not been validated as deployed service security.",
        "nextSteps": "Improve chart readability and document metric definitions and filter behavior before wider sharing.",
        "links": {
          "github": "https://github.com/Sehaj64/amex-operational-risk-dashboard",
          "demo": "https://github.com/Sehaj64/amex-operational-risk-dashboard/blob/main/screenshots/2026-09-13-143932.png",
          "demoLabel": "View report screenshot"
        }
      }
    },
    {
      "id": "sales-dashboard",
      "title": "Retail Profitability & Automated KPI Reporting",
      "shortDescription": "Investigated uneven retail profitability with SQL and turned repeatable analyses into automated Python reports.",
      "tech": [
        "SQL",
        "Python",
        "Power BI",
        "Star Schema"
      ],
      "metrics": {
        "analysis": "50 SQL analyses",
        "automation": "6 KPI outputs"
      },
      "image": null,
      "content": {
        "executiveSummary": "Investigated uneven retail profitability with SQL and turned repeatable analyses into automated Python reports.",
        "businessProblem": "Strong sales can hide loss-making categories. Which parts of the product mix need a closer pricing and discount review?",
        "myRole": "Independent portfolio project: data preparation, implementation and documentation.",
        "dataset": "Sample retail dataset with 9,994 order lines, 5,009 orders, 793 customers and 1,862 products.",
        "solutionArchitecture": "A star-schema model supports joins, CTEs and window functions. Python generates repeatable KPI outputs alongside a dashboard preview.",
        "dataFlow": "Order data → modeled tables → SQL analysis → Python KPI reports → dashboard.",
        "keyFeatures": [
          "Sales and margin reporting",
          "Category and product comparisons",
          "Reusable SQL queries",
          "Written KPI report"
        ],
        "results": "Approximately $2.30 million in sales and a 12.47% margin overall, with about $17,700 in losses in the Tables category. Recommended reviewing discount patterns and testing pricing changes.",
        "limitations": "Sample-data analysis. Recommendations have not been deployed, and no recovered revenue or cost savings are claimed.",
        "nextSteps": "Test proposed pricing changes with an appropriate measurement plan.",
        "links": {
          "github": "https://github.com/Sehaj64/power-bi-portfolio",
          "demo": "https://sehaj64.github.io/power-bi-portfolio/dashboard_preview/",
          "demoLabel": "Dashboard preview"
        }
      }
    },
    {
      "id": "consultbae-data-pipeline",
      "title": "Data Reconciliation & Workflow Automation",
      "shortDescription": "Combined inconsistent candidate sources into a reusable dataset, keeping conflicting identities separate and documenting data-quality decisions.",
      "tech": [
        "Python",
        "Pandas",
        "SQLite",
        "Flask",
        "n8n"
      ],
      "metrics": {
        "reconciliation": "103 valid rows → 56 records",
        "documentation": "16 data issues"
      },
      "image": null,
      "content": {
        "executiveSummary": "Combined inconsistent candidate sources into a reusable dataset, keeping conflicting identities separate and documenting data-quality decisions.",
        "businessProblem": "Conflicting formats and duplicate candidate information make downstream reporting unreliable.",
        "myRole": "Independent portfolio project: data preparation, implementation and documentation.",
        "dataset": "Three CSV sources containing 103 valid rows. Completed as a technical assessment, not employment at ConsultBae.",
        "solutionArchitecture": "Python standardizes fields and applies matching rules before storing records in SQLite. Flask APIs expose the records and n8n connects workflow updates.",
        "dataFlow": "CSV sources → validation and normalization → reconciliation → SQLite → API and workflow.",
        "keyFeatures": [
          "Date and contact normalization",
          "Conflict-aware identity matching",
          "Documented data-quality issues",
          "Reusable API access"
        ],
        "results": "Reconciled the sources into 56 candidate records and documented 16 issues and matching decisions so the processing can be reviewed and repeated.",
        "limitations": "Small assessment dataset; not evidence of enterprise-scale production operation. Identity conflicts require careful review.",
        "nextSteps": "Add source-change monitoring and broader regression checks for matching edge cases.",
        "links": {
          "github": "https://github.com/Sehaj64/Consultbae-assignment",
          "demo": "https://skkr.pythonanywhere.com/results",
          "demoLabel": "Live results"
        }
      }
    },
    {
      "id": "churn-analysis",
      "title": "Customer Churn & Retention Analysis",
      "shortDescription": "Compared customer segments to identify where retention investigation should start.",
      "tech": [
        "Tableau Prep",
        "Tableau",
        "Segmentation"
      ],
      "metrics": {
        "dataset": "6,418 customers",
        "comparison": "46.5% vs 2.7% churn"
      },
      "image": null,
      "content": {
        "executiveSummary": "Compared customer segments to identify where retention investigation should start.",
        "businessProblem": "Which customer groups have higher churn, and where should a team investigate retention opportunities?",
        "myRole": "Independent portfolio project: data preparation, implementation and documentation.",
        "dataset": "6,418 customer records with contract, service and customer attributes.",
        "solutionArchitecture": "Tableau Prep prepares the data and interactive Tableau views compare contract, tenure and service segments.",
        "dataFlow": "Customer records → preparation → segment measures → Tableau dashboard.",
        "keyFeatures": [
          "Contract-level comparisons",
          "Service and demographic filters",
          "Interactive customer segmentation"
        ],
        "results": "Overall churn is approximately 27%. Monthly contracts show 46.5% churn versus 2.7% for two-year contracts, making monthly-contract customers a priority for further analysis.",
        "limitations": "Descriptive associations do not prove that longer contracts cause lower churn. This is not a predictive churn model or a deployed retention intervention.",
        "nextSteps": "Evaluate a retention hypothesis with suitable comparison groups and outcome tracking.",
        "links": {
          "github": "https://github.com/Sehaj64/Churn-analysis",
          "demo": "https://public.tableau.com/app/profile/sehaj.kumar/viz/Churncomplete/ChurnAnalysisDashboard",
          "demoLabel": "Live Tableau dashboard"
        }
      }
    },
    {
      "id": "skillproof-ai",
      "title": "SkillProof AI: Claim-to-Proof Prototype",
      "shortDescription": "An LLM-based assessment workflow that explores resume claims through adaptive questions and organizes responses into a reviewable ledger.",
      "tech": [
        "Python",
        "Gemini API",
        "Streamlit"
      ],
      "metrics": {
        "event": "Deccan AI Catalyst 2026",
        "output": "Claim-to-Proof Ledger"
      },
      "image": null,
      "content": {
        "executiveSummary": "An LLM-based assessment workflow that explores resume claims through adaptive questions and organizes responses into a reviewable ledger.",
        "businessProblem": "A resume claim does not by itself demonstrate proficiency. How could follow-up questions provide more context for a reviewer?",
        "myRole": "Independent portfolio project: data preparation, implementation and documentation.",
        "dataset": "Resume and job-description inputs, with generated technical questions and candidate responses.",
        "solutionArchitecture": "A Streamlit interface uses Gemini to extract information, adapt question depth and generate a Claim-to-Proof Ledger and learning recommendations.",
        "dataFlow": "Resume and JD → extraction → adaptive questions → responses → ledger and learning recommendations.",
        "keyFeatures": [
          "Adaptive question depth",
          "Claim-to-Proof Ledger",
          "Learning recommendations"
        ],
        "results": "Built a working hackathon prototype that organizes claims and responses for review.",
        "limitations": "Not a validated hiring decision system. LLM outputs may be inaccurate or biased and require human review; no hiring accuracy or time-saving benchmark is claimed.",
        "nextSteps": "Create an evaluation set and test consistency, unsupported judgments and failure cases.",
        "links": {
          "github": "https://github.com/Sehaj64/SkillProof-",
          "demo": "https://aiagent0.streamlit.app/",
          "demoLabel": "Live demo"
        }
      }
    },
    {
      "id": "salary-prediction",
      "title": "Salary Prediction & Model Evaluation",
      "shortDescription": "A regression demonstration with separated training and test data, documented preprocessing and an interactive prediction interface.",
      "tech": [
        "Python",
        "scikit-learn",
        "Pandas",
        "Streamlit"
      ],
      "metrics": {
        "model": "Random Forest regression",
        "evaluation": "R² and MSE"
      },
      "image": null,
      "content": {
        "executiveSummary": "A regression demonstration with separated training and test data, documented preprocessing and an interactive prediction interface.",
        "businessProblem": "Explore how structured input features can be used for salary estimation and how predictions should be evaluated.",
        "myRole": "Independent portfolio project: data preparation, implementation and documentation.",
        "dataset": "Seven input features; the repository includes synthetic-data generation. Results are demonstration estimates, not verified labor-market guidance.",
        "solutionArchitecture": "An 80/20 split separates training and test data. Category mappings and missing-value handling prepare inputs, with fitted preprocessing restricted to training data.",
        "dataFlow": "Input data → split → preprocessing → Random Forest → test evaluation → Streamlit.",
        "keyFeatures": [
          "Seven-feature input workflow",
          "Training-only fitted preprocessing",
          "R-squared and mean squared error",
          "Saved-model interface"
        ],
        "results": "Evaluated regression predictions with R-squared and MSE and made the saved model available through Streamlit. No verified numeric performance score is claimed.",
        "limitations": "Synthetic-data support and limited features restrict real-world applicability. Regression performance should not be described as a percentage accuracy.",
        "nextSteps": "Add baseline comparisons, segment error analysis and sensitivity checks.",
        "links": {
          "github": "https://github.com/Sehaj64/Salary-Prediction",
          "demo": "https://salarypredictionmain.streamlit.app/",
          "demoLabel": "Live demo"
        }
      }
    },
    {
      "id": "fitbit-excel",
      "title": "Fitbit Activity Analysis in Excel",
      "shortDescription": "Used PivotTables, logical formulas and charts to compare activity patterns and summarize user behavior.",
      "tech": [
        "Excel",
        "PivotTables",
        "Power Query"
      ],
      "metrics": {
        "coverage": "33 users / 940 daily records",
        "workbook": "8 PivotTables / 7 charts"
      },
      "image": null,
      "content": {
        "executiveSummary": "Used PivotTables, logical formulas and charts to compare activity patterns and summarize user behavior.",
        "businessProblem": "How do daily activity patterns differ across users, and how can spreadsheets make those comparisons easier to inspect?",
        "myRole": "Independent portfolio project: data preparation, implementation and documentation.",
        "dataset": "Public Fitbit activity data; 33 users and 940 daily activity records, with additional sleep, weight and heart-rate sheets.",
        "solutionArchitecture": "Seven worksheets organize source tables, PivotTables, logical formulas, conditional formatting and chart summaries.",
        "dataFlow": "Source sheets → preparation → PivotTable summaries → charts and comparisons.",
        "keyFeatures": [
          "Daily activity trends",
          "Activity-level segmentation",
          "PivotTable reporting",
          "Conditional formatting"
        ],
        "results": "Created a workbook with eight PivotTables and seven charts to explore steps, calories, sleep and activity patterns.",
        "limitations": "Exploratory work, not medical advice. Some original BMI and heart-rate formulas and labels need correction; the workbook is not an audited health classification tool. Screenshots are available in the repository.",
        "nextSteps": "Correct the documented formula and chart issues and validate all derived labels before extending the analysis.",
        "links": {
          "github": "https://github.com/Sehaj64/excel",
          "demo": "https://github.com/Sehaj64/excel#dashboard-preview",
          "demoLabel": "Workbook screenshots"
        }
      }
    }
  ],
  "education": [
    {
      "degree": "B.Tech Artificial Intelligence & Data Science",
      "institution": "Chandigarh Group of Colleges, Landran",
      "period": "2021–2025 • Graduated December 2025",
      "metrics": "CGPA: 7.74/10"
    }
  ],
  "certifications": [
    {
      "name": "Post Graduate Certificate in Data Science",
      "issuer": "Internshala",
      "date": "December 2024"
    },
    {
      "name": "Deloitte Australia Data Analytics Job Simulation",
      "issuer": "Forage",
      "date": "2026"
    }
  ]
};

export const portfolioData = data;
