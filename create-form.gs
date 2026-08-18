/**
 * Validation Survey — EdTech Case Study 4
 * Builds the Google Form from validation-survey.md.
 *
 * HOW TO RUN:
 *   1. Go to https://script.google.com  ->  New project
 *   2. Delete the default code, paste ALL of this in
 *   3. Click Run (the createValidationSurvey function)
 *   4. Approve the one-time Google permission prompt
 *   5. Open View -> Logs (or Execution log) for the Edit + Live links
 */
function createValidationSurvey() {
  var form = FormApp.create('How professionals learn to use AI at work — 2-min survey');

  form.setDescription(
    '2-min survey on how professionals learn to use AI at work. ' +
    'No right answers, not selling anything. Helps us build something genuinely useful.'
  );
  form.setProgressBar(true);
  form.setCollectEmail(false);

  // ---------- Screener ----------
  form.addSectionHeaderItem().setTitle('A little about you');

  // Q1
  form.addTextItem()
    .setTitle('Your role / function?')
    .setRequired(true);

  // Q2
  form.addMultipleChoiceItem()
    .setTitle('How technical is your work?')
    .setChoiceValues([
      'Not technical at all',
      "Somewhat (use tools, don't code)",
      'Technical / I code'
    ])
    .setRequired(true);

  // Q3
  form.addMultipleChoiceItem()
    .setTitle('In the last year, have you tried to get better at using AI for your work?')
    .setChoiceValues([
      'Yes, actively',
      'Thought about it, did little',
      'No'
    ])
    .setRequired(true);

  // ---------- Pain ranking (core) ----------
  form.addSectionHeaderItem().setTitle('What gets in the way');

  // Q4 — pick up to 2
  var q4 = form.addCheckboxItem();
  q4.setTitle("When you've tried to learn AI for work, what stopped you most?")
    .setHelpText('Pick up to 2.')
    .setChoiceValues([
      'Didn\'t know where to start / what to learn first',
      "Too much jargon, couldn't follow",
      'Learned it but had nowhere to actually apply it',
      'Started a course/video but lost momentum and dropped off',
      'Couldn\'t tell which course/tool was actually worth it',
      'Too expensive / already spent money and felt burned'
    ])
    .setRequired(true);
  q4.setValidation(
    FormApp.createCheckboxValidation()
      .setHelpText('Please select at most 2.')
      .requireSelectAtMost(2)
      .build()
  );

  // ---------- Path-picker ----------
  form.addSectionHeaderItem().setTitle('What you actually want AI to do');

  // Q5 — GOLD free text
  form.addParagraphTextItem()
    .setTitle('If AI could just do one thing well for your job tomorrow, what would it be?')
    .setRequired(true);

  // Q6
  form.addMultipleChoiceItem()
    .setTitle('Which are you most keen to actually do with AI?')
    .setChoiceValues([
      'Write/draft work content (emails, docs, JDs)',
      'Analyze data / summarize long documents',
      'Automate a repetitive task',
      'Build a simple tool/app',
      'Research faster',
      'Something specific to my field'
    ])
    .setRequired(true);

  // ---------- Format confirmation ----------
  form.addSectionHeaderItem().setTitle('How you like to learn');

  // Q7
  form.addMultipleChoiceItem()
    .setTitle('What would you actually stick with?')
    .setChoiceValues([
      '10–15 min daily bites',
      'One long weekend session',
      'Live classes',
      'Self-paced long videos'
    ])
    .setRequired(true);

  // Q8
  form.addMultipleChoiceItem()
    .setTitle('Would a short inline quiz/activity while learning help you?')
    .setChoiceValues(['Yes', 'No', 'Maybe'])
    .setRequired(true);

  // ---------- Willingness to pay + trust ----------
  form.addSectionHeaderItem().setTitle('Paying for something that works');

  // Q9
  form.addMultipleChoiceItem()
    .setTitle('Have you paid for an AI/tech course before?')
    .setChoiceValues([
      'Yes, worth it',
      'Yes, felt burned',
      'No'
    ])
    .setRequired(true);

  // Q10
  form.addMultipleChoiceItem()
    .setTitle('How would you rather pay for something that genuinely worked?')
    .setChoiceValues([
      'Per specific use-case/skill',
      'Monthly subscription',
      'One-time fee',
      'Only if free first, then decide'
    ])
    .setRequired(true);

  // Q11
  form.addTextItem()
    .setTitle('What monthly price would feel "fair and trustworthy," not scammy?')
    .setHelpText('A number or a range is fine.')
    .setRequired(false);

  // ---------- Interview opt-in ----------
  form.addSectionHeaderItem().setTitle('Want to go deeper?');

  // Q12
  form.addTextItem()
    .setTitle('Open to a 20-min chat to go deeper? Drop your email/phone.')
    .setHelpText('Optional.')
    .setRequired(false);

  // ---------- Output links ----------
  Logger.log('DONE. Your form is ready.');
  Logger.log('EDIT (you):   ' + form.getEditUrl());
  Logger.log('SHARE (them): ' + form.getPublishedUrl());
}
