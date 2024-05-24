import ThemeContainer from "./ThemeContainer"

export default interface Theme {
	isDark: boolean
	colors: {
		primary: string
		onPrimary: string
		primaryContainer: string
		onPrimaryContainer: string
		secondary: string
		onSecondary: string
		secondaryContainer: string
		onSecondaryContainer: string
		tertiary: string
		onTertiary: string
		tertiaryContainer: string
		onTertiaryContainer: string
		error: string
		onError: string
		errorContainer: string
		onErrorContainer: string
		background: string
		onBackground: string
		surface: string
		onSurface: string
		outline: string
		surfaceVariant: string
		onSurfaceVariant: string
		inverseOnSurface: string,
        inverseSurface: string,
        inversePrimary: string,
        shadow: string,
        surfaceTint: string,
        outlineVariant: string,
        scrim: string,
		inputBackground: string,
	}
	eventCategoryColors: {
		artsCulture: ThemeContainer
		businessProfessional: ThemeContainer
		technologyInnovation: ThemeContainer
		educationLearning: ThemeContainer
		healthWellness: ThemeContainer
		entertainmentRecreation: ThemeContainer
		foodDrink: ThemeContainer
		sportsFitness: ThemeContainer
		travelAdventure: ThemeContainer
		familyParenting: ThemeContainer
		science: ThemeContainer
		social: ThemeContainer
		environmentSustainability: ThemeContainer
		fashionBeauty: ThemeContainer
		financeInvestment: ThemeContainer
		governmentPolitics: ThemeContainer
		religionSpirituality: ThemeContainer
		charityCauses: ThemeContainer
	}
}
