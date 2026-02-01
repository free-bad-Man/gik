"use client";

import React from "react";

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  goalId: string;
  children: React.ReactNode;
}

export function TrackedLink({ goalId, onClick, children, ...props }: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call Metrika
    if (typeof window !== "undefined" && (window as any).ym) {
      const ymId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
      if (ymId) {
        (window as any).ym(parseInt(ymId), "reachGoal", goalId);
      }
    }

    // Call original onClick if exists
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}

export function TrackedTelLink({ phone, className, children }: { phone: string; className?: string; children?: React.ReactNode }) {
  // phone should be clean for href, e.g. +79990000000
  // but often we pass formatted phone. 
  // Let's assume 'phone' prop is the raw number for href, and children is display.
  // If children not provided, show phone.
  
  return (
    <TrackedLink 
      href={`tel:${phone}`} 
      goalId="tel_click" 
      className={className}
    >
      {children || phone}
    </TrackedLink>
  );
}

export function TrackedMailLink({ email, className, children }: { email: string; className?: string; children?: React.ReactNode }) {
  return (
    <TrackedLink 
      href={`mailto:${email}`} 
      goalId="email_click" 
      className={className}
    >
      {children || email}
    </TrackedLink>
  );
}

export function TrackedDownloadLink({ href, className, children }: { href: string; className?: string; children?: React.ReactNode }) {
  return (
    <TrackedLink 
      href={href} 
      goalId="doc_download" 
      className={className}
      download
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </TrackedLink>
  );
}
