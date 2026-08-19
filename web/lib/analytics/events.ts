// Canonical event map — Solution PRD §3. Do not inline raw event strings elsewhere.
export enum Ev {
  LandingView = "landing_view",
  TaskStarted = "task_started",
  WeakPromptSubmitted = "weak_prompt_submitted",
  PromptRebuilt = "prompt_rebuilt",
  OutputGenerated = "output_generated",
  InlineCheckAnswered = "inline_check_answered",
  FirstWinCompleted = "first_win_completed", // ★ headline activation
  SignupCompleted = "signup_completed",
  DrillStarted = "drill_started",
  DrillCompleted = "drill_completed",
  StreakDay = "streak_day",
  CheckpointStarted = "checkpoint_started",
  CheckpointGraded = "checkpoint_graded",
  ShareCardGenerated = "share_card_generated",
  ShareCardClicked = "share_card_clicked",
  FakedoorClicked = "fakedoor_clicked",
}
