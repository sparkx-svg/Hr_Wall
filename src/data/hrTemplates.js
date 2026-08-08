export const hrTemplates = [
    {
        id: "offer-letter",
        title: "Standard Employment Offer Letter",
        category: "recruitment",
        description: "A comprehensive job offer letter template covering salary, start date, stock options, health benefits, and at-will employment terms.",
        format: "Document / Text",
        content: `CONFIDENTIAL EMPLOYMENT OFFER LETTER

[Date]

[Candidate Full Name]
[Candidate Street Address]
[City, State, Zip Code]

Dear [Candidate First Name],

On behalf of [Company Name] ("the Company"), I am thrilled to offer you the full-time position of [Job Title] reporting to [Manager Name/Title]. 

1. Position & Duties
In this role, you will be responsible for [Brief summary of key duties]. Your targeted start date is [Start Date]. Your primary work location will be [Office Location / Remote].

2. Compensation & Benefits
- Base Salary: You will receive an annualized base salary of $[Amount], payable in accordance with the Company’s regular payroll schedule.
- Stock Options: Subject to Board approval, you will be granted an option to purchase [Number] shares of Common Stock under our Equity Incentive Plan.
- Benefits: You will be eligible to participate in our comprehensive benefits package, including medical, dental, vision, 401(k), and paid time off (PTO).

3. At-Will Employment
Your employment with the Company is "at-will," meaning that either you or the Company may terminate the employment relationship at any time, with or without cause or advance notice.

Please sign and return this letter by [Offer Expiration Date] to accept this offer.

Sincerely,

[Hiring Manager / HR Representative Name]
[Title]
[Company Name]

ACCEPTED & AGREED:
Signature: ______________________  Date: ______________`
    },
    {
        id: "nda-template",
        title: "Mutual Employee Non-Disclosure Agreement (NDA)",
        category: "policies",
        description: "Standard confidentiality and non-disclosure agreement protecting trade secrets, proprietary software code, customer data, and IP.",
        format: "Policy / Agreement",
        content: `MUTUAL EMPLOYEE NON-DISCLOSURE AGREEMENT (NDA)

This Employee Non-Disclosure Agreement ("Agreement") is entered into by and between [Company Name] ("Company") and [Employee Name] ("Employee") as of [Date].

1. Confidential Information
Confidential Information includes all non-public technical, financial, customer, business, source code, and product data disclosed by Company to Employee during employment.

2. Non-Disclosure Obligations
Employee agrees to:
a) Hold all Confidential Information in strict confidence using maximum reasonable care.
b) Use Confidential Information solely for performing assigned duties for Company.
c) Refrain from disclosing Confidential Information to third parties without prior written consent.

3. Return of Materials
Upon termination of employment, Employee shall immediately return or destroy all documents, devices, digital files, and proprietary items belonging to Company.

4. Governing Law
This Agreement shall be governed by and construed in accordance with the laws of [State/Country].

EMPLOYEE:                            COMPANY REPRESENTATIVE:
Signature: ___________________        Signature: ___________________
Printed Name: ________________        Title: ________________________`
    },
    {
        id: "remote-work-policy",
        title: "Remote & Hybrid Work Policy",
        category: "policies",
        description: "Clear organizational guidelines on core working hours, home office equipment stipends, cybersecurity measures, and communication etiquette.",
        format: "Company Policy",
        content: `REMOTE & HYBRID WORK POLICY

1. Overview & Purpose
This policy outlines the guidelines for remote and hybrid work arrangements at [Company Name], ensuring operational efficiency, data security, and employee work-life balance.

2. Core Working Hours & Availability
- Core Hours: Employees must be reachable on Slack/Teams and email during core hours: 10:00 AM to 4:00 PM [Time Zone].
- Communication Response Times: Urgent inquiries during core hours should be acknowledged within 1 hour.

3. Equipment & Home Office Stipend
- Company Equipment: Company provides a laptop, charger, and security peripherals.
- Monthly Stipend: Full-time remote employees receive a $[Amount]/month stipend for high-speed internet and home office supplies.

4. Cybersecurity & Data Protection
- Employees must use Company VPN when accessing company infrastructure on public Wi-Fi.
- Multi-Factor Authentication (MFA) is mandatory across all work applications.
- Work devices must not be shared with family members or unauthorized individuals.`
    },
    {
        id: "code-of-conduct",
        title: "Employee Code of Conduct & Workplace Ethics Policy",
        category: "policies",
        description: "Foundational rules governing professional standards, conflict of interest disclosures, anti-bribery, and ethical workplace interactions.",
        format: "Company Policy",
        content: `EMPLOYEE CODE OF CONDUCT & WORKPLACE ETHICS POLICY

1. Purpose & Core Values
[Company Name] is committed to maintaining an environment of trust, respect, accountability, and integrity. This Code of Conduct applies to all employees, contractors, and executives.

2. Professional Demeanor & Respect
Employees are expected to treat colleagues, clients, and partners with dignity. Discrimination, bullying, intimidation, or harassment of any form will not be tolerated.

3. Conflict of Interest
Employees must avoid situations where personal interests conflict with the business interests of [Company Name]. Any outside employment, consulting, or personal investment in competitors must be disclosed in writing to HR.

4. Protection of Company Assets
All physical property, software licenses, data, and financial resources provided by the company must be used responsibly and exclusively for legitimate business purposes.

5. Compliance with Laws
Employees must strictly observe all local, national, and international laws, including wage regulations, environmental standards, and insider trading prohibitions.`
    },
    {
        id: "anti-harassment",
        title: "Anti-Harassment & Equal Opportunity (EEO) Policy",
        category: "policies",
        description: "Formal zero-tolerance anti-harassment policy detailing confidential reporting procedures, investigation workflows, and non-retaliation protections.",
        format: "Policy Document",
        content: `ANTI-HARASSMENT & EQUAL EMPLOYMENT OPPORTUNITY (EEO) POLICY

1. Equal Employment Opportunity Statement
[Company Name] provides equal employment opportunities to all employees and applicants without regard to race, color, religion, sex, national origin, age, disability, sexual orientation, gender identity, or veteran status.

2. Prohibition of Harassment
Harassment includes unwanted verbal, visual, physical, or sexual conduct that creates an intimidating, hostile, or offensive working environment.

3. Reporting Procedure
Any employee who experiences or witnesses harassment should immediately report the incident to:
a) Their direct manager or supervisor
b) Any member of the People/HR Operations Team
c) Confidential Reporting Email: [hr-help@company.com]

4. Investigation & Non-Retaliation
- All complaints will be investigated promptly, impartially, and confidentially.
- Retaliation against any employee reporting harassment in good faith is strictly prohibited and subject to immediate termination of employment.`
    },
    {
        id: "sick-leave-policy",
        title: "Paid Sick Leave & Family Medical Policy",
        category: "policies",
        description: "Rules regarding paid sick leave accrual, notification procedures for absences, doctor notes, and family emergency coverage.",
        format: "Company Policy",
        content: `PAID SICK LEAVE & FAMILY MEDICAL POLICY

1. Entitlement & Accrual
Full-time employees accrue [Number] days of paid sick leave per calendar year. Sick leave may be used for the employee's own illness, medical appointments, or to care for an immediate family member.

2. Notification Requirement
Employees requiring sick leave must notify their manager via Slack/Email prior to the start of their scheduled shift or by 8:30 AM local time.

3. Documentation
For consecutive sick leave absences exceeding three (3) working days, the company may request a medical certificate from a licensed healthcare provider.

4. Carryover & Payout
- Up to [Number] unused sick days may be carried over into the following calendar year.
- Sick leave is not paid out upon separation or termination of employment.`
    },
    {
        id: "performance-review",
        title: "Annual Employee Performance Review Form",
        category: "performance",
        description: "Structured self-evaluation and manager assessment framework covering goal achievements, core competencies, and development plans.",
        format: "Evaluation Form",
        content: `EMPLOYEE PERFORMANCE REVIEW FORM

Employee Name: [Name]              Job Title: [Title]
Manager Name: [Manager Name]       Review Period: [Year/Quarter]

SECTION 1: CORE COMPETENCIES (Rating Scale: 1 - Needs Improvement, 3 - Meets Expectations, 5 - Exceeds Expectations)

1. Quality of Work: [Rating 1-5]
   Comments: [Enter detailed feedback]

2. Communication & Collaboration: [Rating 1-5]
   Comments: [Enter detailed feedback]

3. Problem Solving & Innovation: [Rating 1-5]
   Comments: [Enter detailed feedback]

4. Ownership & Reliability: [Rating 1-5]
   Comments: [Enter detailed feedback]

SECTION 2: GOAL ACHIEVEMENTS
- Objective 1: [Goal Description] - Status: [Achieved / Partially Achieved / Missed]
- Objective 2: [Goal Description] - Status: [Achieved / Partially Achieved / Missed]

SECTION 3: DEVELOPMENT & FUTURE GOALS
- Key Areas for Growth: [List 2-3 development focus points]
- Next Review Objectives: [List SMARTER goals]`
    },
    {
        id: "pip-form",
        title: "Performance Improvement Plan (PIP) Template",
        category: "performance",
        description: "Formal document outlining specific performance deficiencies, required actionable targets, 30-60-90 day timeline, and check-in dates.",
        format: "Performance Tool",
        content: `PERFORMANCE IMPROVEMENT PLAN (PIP)

Employee Name: [Name]              Title: [Title]
Manager Name: [Manager]            Date Issued: [Date]
PIP Duration: [30 / 60 / 90 Days]  Expected End Date: [End Date]

1. AREAS OF PERFORMANCE CONCERN
Detail specific metrics, instances, or behaviors where expectations are not being met:
- Deficit 1: [Describe issue and historical impact]
- Deficit 2: [Describe issue and historical impact]

2. REQUIRED ACTIONABLE GOALS & EXPECTATIONS
Detail the clear, measurable outcomes required for successful completion of this PIP:
- Target 1: [Measurable milestone and deadline]
- Target 2: [Measurable milestone and deadline]

3. COMPANY SUPPORT & SCHEDULED CHECK-INS
- Weekly 1-on-1 progress meetings will occur every [Day of Week] at [Time].
- Resources/Training Provided: [List software access, coaching, or training courses]

4. CONSEQUENCES OF INACTION
Failure to meet and maintain the specified performance standards by [End Date] may result in further disciplinary action, up to and including termination of employment.

EMPLOYEE ACKNOWLEDGMENT:
Signature: ___________________ Date: ________`
    },
    {
        id: "one-on-one-agenda",
        title: "1-on-1 Manager & Employee Weekly Sync Template",
        category: "performance",
        description: "Lightweight agenda structure designed for weekly check-ins focusing on project progress, blockers, priorities, and long-term feedback.",
        format: "Meeting Template",
        content: `1-ON-1 MANAGER & EMPLOYEE SYNC AGENDA

Participants: [Employee Name] & [Manager Name]
Date: [Date] | Cadence: [Weekly / Bi-Weekly]

1. Wins & Highlights (5 min)
- What went exceptionally well this week?
- Recent project milestones achieved:

2. Project Status & Blockers (15 min)
- Top 3 priorities currently underway:
- What is blocking your progress or slowing you down? How can I help?

3. Feedback & Alignment (5 min)
- Employee -> Manager feedback:
- Manager -> Employee feedback:

4. Career & Goal Progress (5 min)
- Progress on quarterly goals (OKRs):
- Skill development / learning opportunities:

5. Action Items for Next Week
- [ ] Action 1 (Owner: Employee)
- [ ] Action 2 (Owner: Manager)`
    },
    {
        id: "rejection-email",
        title: "Professional Candidate Rejection Email Templates",
        category: "recruitment",
        description: "Respectful, empathetic email templates for candidates rejected at the resume screening stage or after final interviews.",
        format: "Email Templates",
        content: `TEMPLATE A: POST-INTERVIEW REJECTION EMAIL

Subject: Thank you for interviewing with [Company Name] - [Job Title]

Dear [Candidate First Name],

Thank you so much for taking the time to interview with our team for the [Job Title] role at [Company Name]. We truly enjoyed learning more about your background and accomplishments.

While your experience is impressive, we have decided to move forward with another candidate whose qualifications align more closely with our current operational needs.

We were sincerely impressed with your expertise and would love to stay connected for future opportunities that match your skill set.

We wish you the very best in your job search and future professional endeavors.

Best regards,

[Your Name]
[Title] | [Company Name]

--------------------------------------------------

TEMPLATE B: RESUME SCREENING REJECTION EMAIL

Subject: Update regarding your application for [Job Title] at [Company Name]

Dear [Candidate First Name],

Thank you for your interest in [Company Name] and for submitting your application for the [Job Title] position.

After careful review of all applications, we regret to inform you that we will not be moving forward with your candidacy at this time. 

We appreciate the time you invested in applying and encourage you to review our careers page in the future for new openings.

Sincerely,

The Talent Acquisition Team
[Company Name]`
    },
    {
        id: "interview-matrix",
        title: "Candidate Interview Scorecard & Rating Matrix",
        category: "recruitment",
        description: "Objective candidate evaluation grid assessing technical skills, culture add, communication, problem-solving, and hiring recommendation.",
        format: "Scoring Matrix",
        content: `CANDIDATE INTERVIEW EVALUATION SCORECARD

Candidate Name: [Candidate Name]       Role: [Job Title]
Interviewer: [Interviewer Name]         Date: [Date]

RATING SCALE: 
1 = Below Expectations | 2 = Meets Some Criteria | 3 = Strong Fit | 4 = Exceptional

1. Technical & Role-Specific Skills [Rating 1-4]
- Evaluated against role requirements and technical assessment.
- Notes: [Enter feedback]

2. Problem Solving & Analytical Thinking [Rating 1-4]
- Evaluated through situational or scenario-based questions.
- Notes: [Enter feedback]

3. Communication & Interpersonal Skills [Rating 1-4]
- Evaluated clarity, listening ability, and structured responses.
- Notes: [Enter feedback]

4. Values & Culture Contribution [Rating 1-4]
- Evaluated alignment with company values, ownership, and adaptability.
- Notes: [Enter feedback]

FINAL RECOMMENDATION:
[ ] Strong Hire
[ ] Hire
[ ] Do Not Hire

Summary Justification:
[Provide 2-3 sentences supporting your hiring decision]`
    },
    {
        id: "compensation-review",
        title: "Annual Salary Increase & Promotion Notice",
        category: "compensation",
        description: "Official memo informing an employee of an annual merit raise, title promotion, adjusted base salary, and revised bonus target.",
        format: "Formal Notice",
        content: `CONFIDENTIAL COMPENSATION & PROMOTION NOTICE

[Date]

[Employee Name]
[Job Title]

Dear [Employee First Name],

In recognition of your outstanding performance, dedication, and contributions to [Company Name] during the past review cycle, we are pleased to inform you of an adjustment to your compensation package.

1. Title Promotion (If Applicable)
- Previous Role: [Old Title]
- New Role: [New Title], Effective [Date]

2. Base Salary Adjustment
- Previous Base Salary: $[Amount] per year
- New Base Salary: $[New Amount] per year (An increase of [Percentage]%)
- Effective Date: [Date]

3. Bonus / Equity Incentive Adjustment
- Target Bonus Percentage: [Percentage]% of base salary
- Additional Equity Refresh: [Number] Stock Options

Thank you for your continued commitment to our team's success. We look forward to your ongoing growth at [Company Name].

Sincerely,

[Executive / HR Director Name]
[Company Name]`
    },
    {
        id: "exit-interview",
        title: "Exit Interview Questionnaire",
        category: "offboarding",
        description: "Standard exit survey questions to uncover root causes of voluntary turnover, management feedback, and culture improvements.",
        format: "Questionnaire",
        content: `EMPLOYEE EXIT INTERVIEW QUESTIONNAIRE

Employee Name: [Name]              Department: [Department]
Separation Date: [Date]             Interviewer: [HR Name]

1. Primary Reason for Leaving
[ ] Better compensation / benefits
[ ] Career growth / advancement opportunity
[ ] Relocation / Personal reasons
[ ] Work environment / Culture
[ ] Other: ___________________________________

2. Work Experience & Feedback
- What did you enjoy most about working at [Company Name]?
- What were the biggest challenges or frustrations in your role?
- How would you rate the support provided by your direct manager?
- Did you receive adequate resources to perform your job effectively?

3. Culture & Team Dynamics
- Would you recommend [Company Name] as a good place to work? Why or why not?
- What suggestions do you have for management to improve employee experience?`
    },
    {
        id: "severance-agreement",
        title: "Employee Severance & Separation Agreement",
        category: "offboarding",
        description: "Formal legal release agreement detailing severance payment terms, benefit continuation, non-disparagement, and claims waiver.",
        format: "Legal Agreement",
        content: `SEVERANCE & SEPARATION AGREEMENT

This Separation Agreement and General Release ("Agreement") is entered into by [Company Name] ("Company") and [Employee Name] ("Employee").

1. Separation Date
Employee's employment with Company will terminate effective [Separation Date].

2. Severance Pay & Benefits
Provided Employee signs and does not revoke this Agreement:
a) Severance Pay: Company shall pay Employee a lump sum severance amount of $[Amount], equivalent to [Number] weeks of base pay.
b) COBRA Continuation: Company shall reimburse Employee's COBRA health coverage premiums for [Number] months.

3. Release of Claims
In exchange for the severance benefits, Employee fully releases Company, its officers, and affiliates from all employment-related claims, demands, and causes of action up to the date of this Agreement.

4. Non-Disparagement & Confidentiality
Employee agrees not to make disparaging statements about Company or disclose confidential financial/operational information.

COMPANY REPRESENTATIVE:                 EMPLOYEE:
Signature: ______________________        Signature: ______________________
Date: ___________________________        Date: ___________________________`
    },
    {
        id: "termination-letter",
        title: "Standard Employment Termination Notice",
        category: "offboarding",
        description: "Formal notification template for employee termination including final paycheck details, severance info, and property return guidelines.",
        format: "Legal Notice",
        content: `NOTICE OF EMPLOYMENT TERMINATION

[Date]

[Employee Name]
[Address]

Dear [Employee Name],

This letter serves as formal notification that your employment with [Company Name] is being terminated, effective [Effective Date].

1. Final Paycheck & COBRA Benefits
Your final paycheck, including earned base pay through [Effective Date] and accrued unused PTO hours ([Number] hours), will be issued on [Date] via [Direct Deposit / Check]. Information regarding COBRA health insurance continuation will be mailed separately.

2. Return of Company Property
Please return all company-owned items (laptop, keycards, access tokens, files) to HR by [Date/Time].

3. Confidentiality Obligations
We remind you of your ongoing confidentiality obligations under the Non-Disclosure Agreement signed on [Date Signed].

Sincerely,

[HR Manager / Executive Name]
[Company Name]`
    }
];
