## Plan: Workflow + Audience Enhancements

1. **Approval Templates & Auto-Escalation**
   - Extend the workflow data model in `src/app/page.tsx` to include reusable approval templates and escalation settings (`type ApprovalStep`, `approvalRoutes`, `initialPlannedPosts`).
   - Wire template selection into the workflow state and schedule creation flows so teams can apply a template, adjust due offsets, and preview the resulting step list (`handleScheduleSubmit`, `selectedTemplateId`, `automationTemplates`).
   - Update `handleApprovalAction` and related UI to mark steps as escalated when owners miss due windows and surface escalation targets alongside the existing routing chips.

2. **Collaboration Upgrades**
   - Expand the collaboration panel around the existing "Team comments" block and presence roster (`teamPresenceRoster`, `Team comments` section) with mention detection, follow-up reminders, and shared checklists tied to approval steps.
   - Add quick actions for handoffs (e.g., request asset upload, attach checklist) and show comment analytics (latest activity, unresolved mentions) directly in the workflow sidebar.

3. **Audience Segmentation Cards**
   - Build cohort segmentation dashboards inside the "Audience insights" section (`audienceTrendData`, `benchmarkMetrics`, `calendarByDay`) with drill-down toggles by channel, cohort, and time window.
   - Visualize coverage vs. benchmarks, highlight under-served cohorts, and surface calendar slots that lack planned content.

4. **Sentiment Tracking & Alerts**
   - Enrich the "Community sentiment" and retention components (`sentimentSamples`, `retentionStages`) with historical trends, anomaly alerts, and sentiment mix over time.
   - Add alert badges for negative swings, plus sparkline overlays so teams can compare sentiment with retention stages.

5. **Recommendation Playbooks**
   - Expand the automated insights and recommendation blocks (`automatedInsight`, `insightRecommendations`, `distributionMatrix`) into actionable playbooks with sequenced next steps, suggested creative angles, and channel-specific guidance.
   - Tie playbooks to the distribution matrix so toggling availability or mirroring rules feeds back into the recommended actions and priority scoring.
