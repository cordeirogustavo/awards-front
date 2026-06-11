import type React from "react";

type PageComponent = React.FC<{ children: React.ReactNode }> & {
	Header: React.FC<{ children: React.ReactNode }> & {
		Content: React.FC<{ children: React.ReactNode }>;
		Actions: React.FC<{ children: React.ReactNode }>;
	};
	Title: React.FC<{ children: React.ReactNode }>;
	SubTitle: React.FC<{ children: React.ReactNode }>;
	Description: React.FC<{ children: React.ReactNode }>;
	Content: React.FC<{ children: React.ReactNode }>;
};

const PageRoot: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className="flex min-h-0 w-full flex-1 flex-col">{children}</div>;
};

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="flex shrink-0 flex-col items-start justify-between pt-4 sm:flex-row">
			{children}
		</div>
	);
};

const HeaderContent: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <div className="flex w-full flex-col gap-2">{children}</div>;
};

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <h1 className="font-bold text-3xl tracking-tight">{children}</h1>;
};

const SubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <h3 className="font-bold text-xl tracking-tight">{children}</h3>;
};

const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <p className="text-zinc-600">{children}</p>;
};

const Actions: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="my-4 flex w-full flex-row justify-end gap-2 sm:my-0">
			{children}
		</div>
	);
};

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="flex min-h-0 w-full flex-1 flex-col gap-4">{children}</div>
	);
};

export const Page = PageRoot as PageComponent;

Page.Header = Header as PageComponent["Header"];
Page.Header.Content = HeaderContent;
Page.Header.Actions = Actions;

Page.Title = Title;
Page.SubTitle = SubTitle;
Page.Description = Description;
Page.Content = Content;
