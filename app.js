(function () {
  'use strict';

  angular.module('passportInfo', [])
    .controller('PassportController', function () {
      var vm = this;
      var storageKey = 'passport-guide-checklist-v1';

      vm.countries = ['United States', 'India', 'Canada', 'United Kingdom', 'Australia', 'Other'];
      vm.tasks = [
        { id: 'service', title: 'Choose the passport service I need', detail: 'New application, renewal, replacement, or another official service.' },
        { id: 'requirements', title: 'Read the current official requirements', detail: 'Confirm the correct application form and supporting documents.' },
        { id: 'photo', title: 'Check passport photo instructions', detail: 'Review the official size, background, and photo rules.' },
        { id: 'fees', title: 'Confirm fees and payment methods', detail: 'Use the official website for current amounts and accepted payment.' },
        { id: 'appointment', title: 'Save my appointment confirmation', detail: 'Verify the date, time, address, and arrival instructions.' },
        { id: 'documents', title: 'Prepare the required documents', detail: 'Use the official checklist for originals, copies, and forms.' }
      ];

      vm.faqs = [
        { question: 'Where do I book a passport appointment?', answer: 'Start at the official passport website for the country that issues your passport. Use the appointment link provided there and check that the website address is official before entering information.' },
        { question: 'Which documents should I bring?', answer: 'Document requirements depend on the country, application type, and personal situation. Follow the exact list in your official appointment instructions and contact the passport authority if anything is unclear.' },
        { question: 'How early should I arrive?', answer: 'Check the arrival time in your appointment confirmation and the office instructions. Allow time for travel and any stated security or check-in process.' },
        { question: 'Can this website reserve an appointment for me?', answer: 'No. This is an informational class project. It does not connect to government booking systems or collect appointment requests.' }
      ];
      vm.openFaq = 0;

      try {
        var saved = JSON.parse(window.localStorage.getItem(storageKey) || '{}');
        vm.tasks.forEach(function (task) { task.done = Boolean(saved[task.id]); });
      } catch (_) {
        vm.tasks.forEach(function (task) { task.done = false; });
      }

      vm.saveTasks = function () {
        var state = {};
        vm.tasks.forEach(function (task) { state[task.id] = task.done; });
        try { window.localStorage.setItem(storageKey, JSON.stringify(state)); } catch (_) { /* Storage may be disabled. */ }
      };
      vm.resetTasks = function () {
        vm.tasks.forEach(function (task) { task.done = false; });
        vm.saveTasks();
      };
      vm.completedCount = function () { return vm.tasks.filter(function (task) { return task.done; }).length; };
      vm.progress = function () { return Math.round(vm.completedCount() / vm.tasks.length * 100); };
      vm.toggleFaq = function (index) { vm.openFaq = vm.openFaq === index ? -1 : index; };
      vm.printChecklist = function () { window.print(); };
    });
}());
