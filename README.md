# Full Stack Technical Test

## The Challenge
Build a modern events platform that solves common challenges faced by organizations managing events in **1 hour**.

This test evaluates your ability to:
- Leverage AI tools effectively for rapid development
- Solve ambiguous requirements with creative solutions
- Build full-stack functionality under time constraints
- Demonstrate modern frontend engineering skills

**Good luck! Remember: we're evaluating your problem-solving approach and AI collaboration skills, not perfection. Use your best judgment and document your assumptions** 🚀

## Before You Start

### Fork This Repository

1. **Fork this repository** using the "Fork" button (top right)
   - Do NOT use "Download" or clone without forking
2. Work in your forked repository
3. Commit with clear START and SUBMISSION messages
4. Submit your fork URL via email once complete

### Time & Tracking
- **Implementation time:** 1 hour (tracked via git commits)
- **Documentation time:** Additional time allowed for README updates
- **Honesty policy:** You can read requirements, review the API documentation and backend architecture/implementation beforehand, but once ready to start implementation please create the tracking commit and try complete within 1 hour. We advise ensuring the API and API key works as expected before starting.

### Technical Requirements
- **Frontend:** React (required) + your choice of other tools
- **AI Tools:** Any models/assistants allowed and highly encouraged
- **API:** Lightweight API provided with shared API key
- **Deployment:** Any platform (API runs on AWS)

### Git Timestamp
```bash
1. Fork this repository
2. First commit: "START: Beginning 1-hour test" 
3. Work for exactly 1 hour with frequent commits
4. Final commit: "SUBMISSION: 1-hour complete"
```


## 📋 Core Requirements (Required)

### Must Have:
1. **Events listing page** with basic filtering and search
2. **Event detail pages** with registration functionality
3. **Responsive design** for mobile and desktop
4. **Working deployment** with shareable URL

## 🚀 Bonus Features (Optional)

**Quality over quantity** - pick one bonus feature that interests you most:

### 📝 Dynamic Event Categories & Content
- Event categories with configurable descriptions, colors, icons
- Marketing copy and promotional banners managed separately from code
- Demonstrate separation of developer-defined structure vs content-managed data
- Show how non-technical staff could manage this content

### 🎯 Event Capacity & Waitlists
- Events have maximum capacity (some are full)
- Users can join waitlists for full events
- Show capacity status (Available/Few spots left/Full/Waitlist)
- May require extending the provided API

### 💾 My Events Feature
- Track events that users have registered for
- **Challenge:** No user account system exists - be creative!
- Consider localStorage, email lookup, session tokens, or other approaches
- Handle edge cases (browser clearing, multiple devices, etc.)


## 🛠 What's Provided

### API Base URL
```
https://x15zoj9on9.execute-api.us-east-1.amazonaws.com/prod/events
```

### API Endpoints
- `GET /events` - List all events with filtering
- `GET /events/:id` - Get event details
- `POST /events/:id/register` - Register for an event

## API Documentation

The complete API specification is available in OpenAPI 3.0 format: [openapi.yaml](https://github.com/HultTechnology/full-stack-tech-test-backend/blob/main/openapi.yaml)

**View the interactive documentation:**
1. Go to [Swagger Editor](https://editor.swagger.io/)
2. Copy the contents of [openapi.yaml](https://github.com/HultTechnology/full-stack-tech-test-backend/blob/main/openapi.yaml)
3. Paste into the editor to see interactive API documentation

### Sample Data
The API includes 20+ sample events with:
- Different dates and times
- Various categories and types
- Mix of online and physical locations
- Rich content for testing different scenarios

### API Code
See [full-stack-tech-test-backend](https://github.com/HultTechnology/full-stack-tech-test-backend)


## 📦 Deliverables

### Required:
- **GitHub repository** (this fork) with your solution
- **Working deployed URL** 
- **Updated README** (below) documenting your approach

### Update This README:

#### 🔗 Deployed URL
<!-- Add your deployed URL here -->
**Live Demo:** https://full-stack-technical-test-kappa.vercel.app

#### ⚡ My Approach

I chose a tech stack optimised for rapid, AI-assisted development and a professional, modern user experience:

**Technology Choices:**
<!-- List your tech stack and why you chose it -->
- Vite + React: Live reload dev server and optimised build process

- shadcn + Tailwind: shadcn for simple, easy to use UI components without requiring installing large component library. Both industry standards and well understood by AI tools

- Axios: Created a central API client with Axios because it handles base URLs, tokens, and JSON parsing more cleanly than fetch, which saved time when implementing

- React Router: Standard client-side routing, needed a basic router and 2-3 pages doesn't require more advanced routers

**AI Tool Usage:**
<!-- Document how you used AI tools and what they helped with -->
- Claude Code: Provided initial project set up with dependencies and structure. Used for implementation of each feature and helped when implementing complex features later that required changes across multiple components, such as adding client-side event tracking after implementing registration

- Gemini: Helped provide guidance and feedback on technical decisions I was making

**Bonus Feature (if implemented):**
<!-- Which bonus feature you chose and how you implemented it -->
I implemented the My Events Feature using local storage

- Implementation: Added a custom hook to uses a set to track event ids for events the user has registered for and serialises to and from local storage

- Integration: The custom hook is used by the event details page to track and check registered events when the registration modal successfully registers via the API and conditionally disable registering if the current event has already been registered

- Choices: Chose to only store event ids. One option would have been to track event ids for individual email addresses and support multiple users on the same client, but given the time constraints I chose to focus on implementing the core feature itself rather than a more complex implementation and assume one user per client browser. Storing email addresses locally could also instroduce security and data risks

**Key Design Decisions:**
<!-- Explain any important architectural or UX decisions -->
- Chose not to implement paging even though it's supported by the API as I wanted to focus on the core features and with the small number of events currently there's little benefit to implementing it now. This is someting that can be implemented later when the services grows

- For the UI I opted for a pragmatic neobrutalist design to create a cohesive, modern-looking app within the time limit, allowing me to focus on the functional requirements rather than custom styling

- Encapsulated all API logic into custom React hooks. Instead of placing axios calls and state management directly inside my page components, this approach created a clean separation of concerns, made the UI components simpler, and ensured the data-fetching logic was reusable

#### 🚀 Getting Started
<!-- Add setup instructions for running locally -->
```bash
# Installation
yarn

# Development
yarn run dev

# Build
yarn run build
```
