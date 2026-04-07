import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "common": {
        "loading": "Loading your budget...",
        "logout": "Logout",
        "save": "Save",
        "cancel": "Cancel",
        "description": "Description",
        "amount": "Amount",
        "category": "Category",
        "date": "Date",
        "type": "Type",
        "income": "Income",
        "incomes": "Incomes",
        "expense": "Expense",
        "expenses": "Expenses",
        "outcomes": "Outcomes",
        "balance": "Balance",
        "update": "Update",
        "confirm": "Confirm",
        "delete": "Delete",
        "no_data": "No data available to display.",
        "net_balance": "Net Balance",
        "select": "Select",
        "month": "Month"
      },
      "nav": {
        "dashboard": "Dashboard",
        "transactions": "Transactions",
        "reports": "Reports",
        "settings": "Settings"
      },
      "dashboard": {
        "total_balance": "Total Balance",
        "recent_activity": "Recent Activity",
        "no_transactions": "No recent transactions to show."
      },
      "transactions": {
        "title": "Transactions",
        "add_new": "Add New Transaction",
        "history": "Transaction History",
        "no_history": "Your transaction history will appear here.",
        "description_placeholder": "What was it for?",
        "add_button": "Add Transaction"
      },
      "reports": {
        "title": "Financial Reports",
        "expenses_structure": "Expenses Structure",
        "incomes_structure": "Incomes Structure",
        "quick_stats": "Quick Stats (Last 30 Days)",
        "daily_stats": "Daily Statistics",
        "monthly_stats": "Monthly Statistics",
        "metric": "Metric",
        "daily": "Daily",
        "monthly": "Monthly",
        "select_date": "Select Date",
        "select_month": "Select Month",
        "total_income": "Total Income",
        "total_expenses": "Total Expenses",
        "metrics": {
          "count": "Transactions Count",
          "avg_day": "Average per Day",
          "avg_month": "Average Monthly",
          "sum_30": "Sum (Last 30 Days)"
        }
      },
      "settings": {
        "title": "Settings",
        "language": "Language",
        "theme": "Theme",
        "dark": "Dark",
        "light": "Light",
        "appearance": "Appearance",
        "appearance_desc": "Customize how Budget Manager looks on your device.",
        "accessibility": "Accessibility",
        "accessibility_desc": "Adjust settings to make Budget Manager easier to use.",
        "high_contrast": "High Contrast",
        "high_contrast_desc": "Increase color contrast for better readability.",
        "reduced_motion": "Reduced Motion",
        "reduced_motion_desc": "Minimize animations and transitions.",
        "font_size": "Font Size",
        "small": "Small",
        "medium": "Medium",
        "large": "Large",
        "profile": "Profile Information",
        "profile_desc": "Update your account details.",
        "security": "Security",
        "security_desc": "Manage your password to keep your account secure.",
        "current_password": "Current Password",
        "new_password": "New Password",
        "confirm_password": "Confirm New Password",
        "update_profile": "Update Profile",
        "update_password": "Update Password",
        "preferences": "Transaction Preferences",
        "preferences_desc": "Set default values for new transactions.",
        "default_category": "Default Category",
        "danger_zone": "Danger Zone",
        "danger_zone_desc": "Permanent actions that cannot be undone.",
        "clear_history": "Clear Transaction History",
        "clear_history_desc": "Remove all income and expense entries from your account.",
        "clear_button": "Clear History",
        "modal_title": "Are you absolutely sure?",
        "modal_message": "This will permanently delete all your transaction data. This action cannot be reversed.",
        "modal_confirm": "Yes, delete everything"
      },
      "welcome": {
        "title": "Welcome to Budget Manager!",
        "description": "Take control of your finances with our simple and effective budget tracking tool.",
        "feature_1": "Track your daily expenses and income",
        "feature_2": "Categorize transactions for better insights",
        "feature_3": "Access your data from anywhere",
        "button": "Get Started"
      },
      "auth": {
        "login": "Login",
        "register": "Register",
        "email": "Email",
        "password": "Password",
        "username": "Username",
        "create_account": "Create Account",
        "no_account": "Don't have an account?",
        "have_account": "Already have an account?",
        "login_here": "Login here",
        "register_here": "Register here"
      },
      "categories": {
        "Food": "Food",
        "Transport": "Transport",
        "Housing": "Housing",
        "Entertainment": "Entertainment",
        "Health": "Health",
        "Shopping": "Shopping",
        "Salary": "Salary",
        "Freelance": "Freelance",
        "Investment": "Investment",
        "Gift": "Gift",
        "Other": "Other"
      }
    }
  },
  pl: {
    translation: {
      "common": {
        "loading": "Ładowanie Twojego budżetu...",
        "logout": "Wyloguj",
        "save": "Zapisz",
        "cancel": "Anuluj",
        "description": "Opis",
        "amount": "Kwota",
        "category": "Kategoria",
        "date": "Data",
        "type": "Typ",
        "income": "Dochód",
        "incomes": "Dochody",
        "expense": "Wydatek",
        "expenses": "Wydatki",
        "outcomes": "Wydatki",
        "balance": "Saldo",
        "update": "Aktualizuj",
        "confirm": "Potwierdź",
        "delete": "Usuń",
        "no_data": "Brak danych do wyświetlenia.",
        "net_balance": "Saldo netto"
      },
      "nav": {
        "dashboard": "Pulpit",
        "transactions": "Transakcje",
        "reports": "Raporty",
        "settings": "Ustawienia"
      },
      "dashboard": {
        "total_balance": "Całkowite saldo",
        "recent_activity": "Ostatnia aktywność",
        "no_transactions": "Brak ostatnich transakcji."
      },
      "transactions": {
        "title": "Transakcje",
        "add_new": "Dodaj nową transakcję",
        "history": "Historia transakcji",
        "no_history": "Tutaj pojawi się Twoja historia transakcji.",
        "description_placeholder": "Za co to było?",
        "add_button": "Dodaj transakcję"
      },
      "reports": {
        "title": "Raporty finansowe",
        "expenses_structure": "Struktura wydatków",
        "incomes_structure": "Struktura dochodów",
        "quick_stats": "Szybkie statystyki (Ostatnie 30 dni)",
        "daily_stats": "Statystyki dzienne",
        "monthly_stats": "Statystyki miesięczne",
        "metric": "Metryka",
        "daily": "Dziennie",
        "monthly": "Miesięcznie",
        "select_date": "Wybierz datę",
        "select_month": "Wybierz miesiąc",
        "total_income": "Całkowity dochód",
        "total_expenses": "Całkowite wydatki",
        "metrics": {
          "count": "Liczba transakcji",
          "avg_day": "Średnia dziennie",
          "avg_month": "Średnia miesięcznie",
          "sum_30": "Suma (Ostatnie 30 dni)"
        }
      },
      "settings": {
        "title": "Ustawienia",
        "language": "Język",
        "theme": "Motyw",
        "dark": "Ciemny",
        "light": "Jasny",
        "appearance": "Wygląd",
        "appearance_desc": "Dostosuj sposób wyświetlania Budget Manager na Twoim urządzeniu.",
        "accessibility": "Dostępność",
        "accessibility_desc": "Dostosuj ustawienia, aby ułatwić korzystanie z aplikacji.",
        "high_contrast": "Wysoki kontrast",
        "high_contrast_desc": "Zwiększ kontrast kolorów dla lepszej czytelności.",
        "reduced_motion": "Ograniczony ruch",
        "reduced_motion_desc": "Zminimalizuj animacje i przejścia.",
        "font_size": "Wielkość czcionki",
        "small": "Mała",
        "medium": "Średnia",
        "large": "Duża",
        "profile": "Informacje o profilu",
        "profile_desc": "Zaktualizuj dane swojego konta.",
        "security": "Bezpieczeństwo",
        "security_desc": "Zarządzaj hasłem, aby chronić swoje konto.",
        "current_password": "Aktualne hasło",
        "new_password": "Nowe hasło",
        "confirm_password": "Potwierdź nowe hasło",
        "update_profile": "Aktualizuj profil",
        "update_password": "Aktualizuj hasło",
        "preferences": "Preferencje transakcji",
        "preferences_desc": "Ustaw domyślne wartości dla nowych transakcji.",
        "default_category": "Domyślna kategoria",
        "danger_zone": "Strefa niebezpieczeństwa",
        "danger_zone_desc": "Działania permanentne, których nie można cofnąć.",
        "clear_history": "Wyczyść historię transakcji",
        "clear_history_desc": "Usuń wszystkie wpisy o dochodach i wydatkach ze swojego konta.",
        "clear_button": "Wyczyść historię",
        "modal_title": "Czy jesteś całkowicie pewien?",
        "modal_message": "To spowoduje trwałe usunięcie wszystkich danych transakcji. Tej akcji nie można cofnąć.",
        "modal_confirm": "Tak, usuń wszystko"
      },
      "welcome": {
        "title": "Witaj w Budget Manager!",
        "description": "Przejmij kontrolę nad swoimi finansami dzięki naszemu prostemu i skutecznemu narzędziu.",
        "feature_1": "Śledź swoje codzienne wydatki i dochody",
        "feature_2": "Kategoryzuj transakcje dla lepszego wglądu",
        "feature_3": "Dostęp do danych z dowolnego miejsca",
        "button": "Zacznij teraz"
      },
      "auth": {
        "login": "Zaloguj się",
        "register": "Zarejestruj się",
        "email": "Email",
        "password": "Hasło",
        "username": "Nazwa użytkownika",
        "create_account": "Stwórz konto",
        "no_account": "Nie masz konta?",
        "have_account": "Masz już konto?",
        "login_here": "Zaloguj się tutaj",
        "register_here": "Zarejestruj się tutaj"
      },
      "categories": {
        "Food": "Jedzenie",
        "Transport": "Transport",
        "Housing": "Mieszkanie",
        "Entertainment": "Rozrywka",
        "Health": "Zdrowie",
        "Shopping": "Zakupy",
        "Salary": "Pensja",
        "Freelance": "Freelance",
        "Investment": "Inwestycje",
        "Gift": "Prezent",
        "Other": "Inne"
      }
    }
  },
  de: {
    translation: {
      "common": {
        "loading": "Ihr Budget wird geladen...",
        "logout": "Abmelden",
        "save": "Speichern",
        "cancel": "Abbrechen",
        "description": "Beschreibung",
        "amount": "Betrag",
        "category": "Kategorie",
        "date": "Datum",
        "type": "Typ",
        "income": "Einkommen",
        "incomes": "Einnahmen",
        "expense": "Ausgabe",
        "expenses": "Ausgaben",
        "outcomes": "Ausgaben",
        "balance": "Kontostand",
        "update": "Aktualisieren",
        "confirm": "Bestätigen",
        "delete": "Löschen",
        "no_data": "Keine Daten zur Anzeige verfügbar.",
        "net_balance": "Netto-Guthaben"
      },
      "nav": {
        "dashboard": "Dashboard",
        "transactions": "Transaktionen",
        "reports": "Berichte",
        "settings": "Einstellungen"
      },
      "dashboard": {
        "total_balance": "Gesamtguthaben",
        "recent_activity": "Letzte Aktivität",
        "no_transactions": "Keine letzten Transaktionen anzuzeigen."
      },
      "transactions": {
        "title": "Transaktionen",
        "add_new": "Neue Transaktion hinzufügen",
        "history": "Transaktionsverlauf",
        "no_history": "Ihr Transaktionsverlauf wird hier angezeigt.",
        "description_placeholder": "Wofür war es?",
        "add_button": "Transaktion hinzufügen"
      },
      "reports": {
        "title": "Finanzberichte",
        "expenses_structure": "Ausgabenstruktur",
        "incomes_structure": "Einnahmenstruktur",
        "quick_stats": "Schnellstatistik (Letzte 30 Tage)",
        "daily_stats": "Tägliche Statistiken",
        "monthly_stats": "Monatliche Statistiken",
        "metric": "Metrik",
        "daily": "Täglich",
        "monthly": "Monatlich",
        "select_date": "Datum auswählen",
        "select_month": "Monat auswählen",
        "total_income": "Gesamteinkommen",
        "total_expenses": "Gesamtausgaben",
        "metrics": {
          "count": "Anzahl der Transaktionen",
          "avg_day": "Durchschnitt pro Tag",
          "avg_month": "Durchschnitt pro Monat",
          "sum_30": "Summe (Letzte 30 Tage)"
        }
      },
      "settings": {
        "title": "Einstellungen",
        "language": "Sprache",
        "theme": "Thema",
        "dark": "Dunkel",
        "light": "Hell",
        "appearance": "Erscheinungsbild",
        "appearance_desc": "Passen Sie an, wie der Budget Manager auf Ihrem Gerät aussieht.",
        "accessibility": "Barrierefreiheit",
        "accessibility_desc": "Passen Sie die Einstellungen an, um die Bedienung zu erleichtern.",
        "high_contrast": "Hoher Kontrast",
        "high_contrast_desc": "Erhöhen Sie den Farbkontrast für eine bessere Lesbarkeit.",
        "reduced_motion": "Reduzierte Bewegung",
        "reduced_motion_desc": "Minimieren Sie Animationen und Übergänge.",
        "font_size": "Schriftgröße",
        "small": "Klein",
        "medium": "Mittel",
        "large": "Groß",
        "profile": "Profilinformationen",
        "profile_desc": "Aktualisieren Sie Ihre Kontodaten.",
        "security": "Sicherheit",
        "security_desc": "Verwalten Sie Ihr Passwort, um Ihr Konto sicher zu halten.",
        "current_password": "Aktuelles Passwort",
        "new_password": "Neues Passwort",
        "confirm_password": "Neues Passwort bestätigen",
        "update_profile": "Profil aktualisieren",
        "update_password": "Passwort aktualisieren",
        "preferences": "Transaktionseinstellungen",
        "preferences_desc": "Standardwerte für neue Transaktionen festlegen.",
        "default_category": "Standardkategorie",
        "danger_zone": "Gefahrenzone",
        "danger_zone_desc": "Dauerhafte Aktionen, die nicht rückgängig gemacht werden können.",
        "clear_history": "Transaktionsverlauf löschen",
        "clear_history_desc": "Entfernen Sie alle Einnahmen- und Ausgabeneinträge von Ihrem Konto.",
        "clear_button": "Verlauf löschen",
        "modal_title": "Sind Sie absolut sicher?",
        "modal_message": "Dies wird alle Ihre Transaktionsdaten dauerhaft löschen. Diese Aktion kann nicht rückgängig gemacht werden.",
        "modal_confirm": "Ja, alles löschen"
      },
      "welcome": {
        "title": "Willkommen beim Budget Manager!",
        "description": "Übernehmen Sie die Kontrolle über Ihre Finanzen mit unserem einfachen und effektiven Budget-Tracking-Tool.",
        "feature_1": "Verfolgen Sie Ihre täglichen Ausgaben und Einnahmen",
        "feature_2": "Kategorisieren Sie Transaktionen für bessere Einblicke",
        "feature_3": "Greifen Sie von überall auf Ihre Daten zu",
        "button": "Loslegen"
      },
      "auth": {
        "login": "Anmelden",
        "register": "Registrieren",
        "email": "E-Mail",
        "password": "Passwort",
        "username": "Benutzername",
        "create_account": "Konto erstellen",
        "no_account": "Haben Sie noch kein Konto?",
        "have_account": "Haben Sie bereits ein Konto?",
        "login_here": "Hier anmelden",
        "register_here": "Hier registrieren"
      },
      "categories": {
        "Food": "Essen",
        "Transport": "Transport",
        "Housing": "Wohnen",
        "Entertainment": "Unterhaltung",
        "Health": "Gesundheit",
        "Shopping": "Einkaufen",
        "Salary": "Gehalt",
        "Freelance": "Freiberuflich",
        "Investment": "Investition",
        "Gift": "Geschenk",
        "Other": "Andere"
      }
    }
  },
  fr: {
    translation: {
      "common": {
        "loading": "Chargement de votre budget...",
        "logout": "Déconnexion",
        "save": "Enregistrer",
        "cancel": "Annuler",
        "description": "Description",
        "amount": "Montant",
        "category": "Catégorie",
        "date": "Date",
        "type": "Type",
        "income": "Revenu",
        "incomes": "Revenus",
        "expense": "Dépense",
        "expenses": "Dépenses",
        "outcomes": "Dépenses",
        "balance": "Solde",
        "update": "Mettre à jour",
        "confirm": "Confirmer",
        "delete": "Supprimer",
        "no_data": "Aucune donnée disponible pour l'affichage.",
        "net_balance": "Solde Net"
      },
      "nav": {
        "dashboard": "Tableau de bord",
        "transactions": "Transactions",
        "reports": "Rapports",
        "settings": "Paramètres"
      },
      "dashboard": {
        "total_balance": "Solde total",
        "recent_activity": "Activité récente",
        "no_transactions": "Aucune transaction récente à afficher."
      },
      "transactions": {
        "title": "Transactions",
        "add_new": "Ajouter une nouvelle transaction",
        "history": "Historique des transactions",
        "no_history": "Votre historique de transactions apparaîtra ici.",
        "description_placeholder": "C'était pour quoi ?",
        "add_button": "Ajouter une transaction"
      },
      "reports": {
        "title": "Rapports financiers",
        "expenses_structure": "Structure des dépenses",
        "incomes_structure": "Structure des revenus",
        "quick_stats": "Statistiques rapides (30 derniers jours)",
        "daily_stats": "Statistiques quotidiennes",
        "monthly_stats": "Statistiques mensuelles",
        "metric": "Métrique",
        "daily": "Quotidien",
        "monthly": "Mensuel",
        "select_date": "Choisir une date",
        "select_month": "Choisir un mois",
        "total_income": "Revenu total",
        "total_expenses": "Dépenses totales",
        "metrics": {
          "count": "Nombre de transactions",
          "avg_day": "Moyenne par jour",
          "avg_month": "Moyenne mensuelle",
          "sum_30": "Somme (30 derniers jours)"
        }
      },
      "settings": {
        "title": "Paramètres",
        "language": "Langue",
        "theme": "Thème",
        "dark": "Sombre",
        "light": "Clair",
        "appearance": "Apparence",
        "appearance_desc": "Personnalisez l'apparence de Budget Manager sur votre appareil.",
        "accessibility": "Accessibilité",
        "accessibility_desc": "Ajustez les paramètres pour faciliter l'utilisation de l'application.",
        "high_contrast": "Contraste élevé",
        "high_contrast_desc": "Augmentez le contraste des couleurs pour une meilleure lisibilité.",
        "reduced_motion": "Mouvement réduit",
        "reduced_motion_desc": "Minimisez les animations et les transitions.",
        "font_size": "Taille de police",
        "small": "Petite",
        "medium": "Moyenne",
        "large": "Grande",
        "profile": "Informations du profil",
        "profile_desc": "Mettez à jour vos informations de compte.",
        "security": "Sécurité",
        "security_desc": "Gérez votre mot de passe pour sécuriser votre compte.",
        "current_password": "Mot de passe actuel",
        "new_password": "Nouveau mot de passe",
        "confirm_password": "Confirmer le nouveau mot de passe",
        "update_profile": "Mettre à jour le profil",
        "update_password": "Mettre à jour le mot de passe",
        "preferences": "Préférences de transaction",
        "preferences_desc": "Définir les valeurs par défaut pour les nouvelles transactions.",
        "default_category": "Catégorie par défaut",
        "danger_zone": "Zone de danger",
        "danger_zone_desc": "Actions permanentes qui ne peuvent pas être annulées.",
        "clear_history": "Effacer l'historique des transactions",
        "clear_history_desc": "Supprimez toutes les entrées de revenus et de dépenses de votre compte.",
        "clear_button": "Effacer l'historique",
        "modal_title": "Êtes-vous absolument sûr ?",
        "modal_message": "Cela supprimera définitivement toutes vos données de transaction. Cette action est irréversible.",
        "modal_confirm": "Oui, tout supprimer"
      },
      "welcome": {
        "title": "Bienvenue sur Budget Manager !",
        "description": "Prenez le contrôle de vos finances avec notre outil de suivi budgétaire simple et efficace.",
        "feature_1": "Suivez vos dépenses et revenus quotidiens",
        "feature_2": "Catégorisez les transactions pour de meilleures analyses",
        "feature_3": "Accédez à vos données de n'importe où",
        "button": "Commencer"
      },
      "auth": {
        "login": "Connexion",
        "register": "S'inscrire",
        "email": "Email",
        "password": "Mot de passe",
        "username": "Nom d'utilisateur",
        "create_account": "Créer un compte",
        "no_account": "Vous n'avez pas de compte ?",
        "have_account": "Vous avez déjà un compte ?",
        "login_here": "Connectez-vous ici",
        "register_here": "Inscrivez-vous ici"
      },
      "categories": {
        "Food": "Nourriture",
        "Transport": "Transport",
        "Housing": "Logement",
        "Entertainment": "Divertissement",
        "Health": "Santé",
        "Shopping": "Achats",
        "Salary": "Salaire",
        "Freelance": "Freelance",
        "Investment": "Investissement",
        "Gift": "Cadeau",
        "Other": "Autre"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
