import type React from "react";

type Variant = "default" | "success" | "info" | "error" | "warning";

type FeedbackComponent = React.FC<{
	children: React.ReactNode;
	fullScreen?: boolean;
}> & {
	Content: React.FC<{ children: React.ReactNode }>;
	Icon: React.FC<{ children: React.ReactNode; variant?: Variant }>;
	Body: React.FC<{ children: React.ReactNode }>;
	Title: React.FC<{ children: React.ReactNode }>;
	Description: React.FC<{ children: React.ReactNode }>;
	Actions: React.FC<{ children: React.ReactNode }>;
};

const FeedbackRoot: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<div className="absolute inset-0 z-50 flex w-full flex-col items-center justify-center p-6">
			{children}
		</div>
	);
};

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="fade-in zoom-in flex max-w-md animate-in flex-col items-center gap-5 text-center duration-300">
			{children}
		</div>
	);
};

const variantStyles: Record<Variant, string> = {
	default: "bg-zinc-100",
	success: "bg-green-500/10",
	info: "bg-blue-500/10",
	error: "bg-destructive/10",
	warning: "bg-yellow-500/10",
};

const Icon: React.FC<{ children: React.ReactNode; variant?: Variant }> = ({
	children,
	variant = "default",
}) => {
	return (
		<div
			className={`flex h-20 w-20 items-center justify-center rounded-full ${variantStyles[variant]}`}
		>
			{children}
		</div>
	);
};

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className="space-y-2">{children}</div>;
};

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<h2 className="font-bold text-2xl text-foreground tracking-tight">
			{children}
		</h2>
	);
};

const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<p className="text-muted-foreground text-sm leading-relaxed">{children}</p>
	);
};

const Actions: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="mt-2 flex min-w-35 flex-col items-center gap-2 sm:flex-row">
			{children}
		</div>
	);
};

export const Feedback = FeedbackRoot as FeedbackComponent;

Feedback.Content = Content;
Feedback.Icon = Icon;
Feedback.Body = Body;
Feedback.Title = Title;
Feedback.Description = Description;
Feedback.Actions = Actions;
