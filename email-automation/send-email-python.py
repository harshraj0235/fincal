#!/usr/bin/env python3
"""
MoneyCal Email Automation System - Python Version
Sends beautiful HTML emails to subscribers with random content
"""

import smtplib
import json
import random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os

# Email credentials
SENDER_EMAIL = "moneycalx9@gmail.com"
SENDER_PASSWORD = "Mahima123#@"
SENDER_NAME = "MoneyCal - Your Financial Companion"

# Load data files
def load_json(filename):
    with open(os.path.join(os.path.dirname(__file__), filename), 'r', encoding='utf-8') as f:
        return json.load(f)

# Load subscribers and content
subscribers_data = load_json('subscribers.json')
content_data = load_json('content-database.json')

# Load email template
with open(os.path.join(os.path.dirname(__file__), 'email-template.html'), 'r', encoding='utf-8') as f:
    email_template = f.read()

def get_random_content():
    """Get random content from all categories"""
    all_content = []
    
    for item in content_data.get('blogs', []):
        all_content.append({**item, 'type': 'blog'})
    for item in content_data.get('tools', []):
        all_content.append({**item, 'type': 'tool'})
    for item in content_data.get('schemes', []):
        all_content.append({**item, 'type': 'scheme'})
    for item in content_data.get('festivals', []):
        all_content.append({**item, 'type': 'festival'})
    
    return random.choice(all_content)

def generate_email_html(subscriber_name, content):
    """Generate personalized email HTML"""
    html = email_template
    
    # Replace placeholders
    replacements = {
        '{{SUBSCRIBER_NAME}}': subscriber_name or 'Friend',
        '{{SUBJECT}}': content['title'],
        '{{CATEGORY}}': content['category'],
        '{{TITLE}}': content['title'],
        '{{DESCRIPTION}}': content['description'],
        '{{URL}}': content['url'],
        '{{UNSUBSCRIBE_URL}}': 'https://moneycal.in/unsubscribe'
    }
    
    for placeholder, value in replacements.items():
        html = html.replace(placeholder, value)
    
    return html

def send_email(to_email, to_name, content):
    """Send email to a subscriber"""
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"🌟 {content['title']} | MoneyCal"
        msg['From'] = f'"{SENDER_NAME}" <{SENDER_EMAIL}>'
        msg['To'] = to_email
        msg['List-Unsubscribe'] = '<https://moneycal.in/unsubscribe>'
        
        # Generate HTML
        html_content = generate_email_html(to_name, content)
        
        # Attach HTML
        html_part = MIMEText(html_content, 'html', 'utf-8')
        msg.attach(html_part)
        
        # Connect to Gmail SMTP
        print(f'📤 Connecting to Gmail SMTP...')
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        
        print(f'🔐 Logging in as {SENDER_EMAIL}...')
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        
        print(f'📧 Sending email to {to_email}...')
        server.send_message(msg)
        server.quit()
        
        print(f'✅ Email sent successfully to {to_email}!')
        return True
        
    except Exception as e:
        print(f'❌ Error sending email: {str(e)}')
        
        if '535' in str(e):
            print('\n🔐 Authentication Error!')
            print('Possible solutions:')
            print('1. Enable "Less secure app access" in Gmail')
            print('   Visit: https://myaccount.google.com/lesssecureapps')
            print('2. Use App Password instead')
            print('   Visit: https://myaccount.google.com/apppasswords')
            print('3. Enable 2-Factor Authentication first, then create App Password')
        
        return False

def send_to_all_subscribers():
    """Send email to all active subscribers"""
    print('\n' + '='*60)
    print('📧 MONEYCAL EMAIL AUTOMATION - SENDING NOW')
    print('='*60 + '\n')
    
    # Get active subscribers
    active_subscribers = [sub for sub in subscribers_data['subscribers'] if sub['active']]
    
    if not active_subscribers:
        print('❌ No active subscribers found!')
        return
    
    print(f'👥 Active subscribers: {len(active_subscribers)}')
    
    # Get random content
    content = get_random_content()
    
    print(f'\n📚 Selected Content:')
    print(f'   Title: {content["title"]}')
    print(f'   Category: {content["category"]}')
    print(f'   URL: {content["url"]}')
    print(f'   Type: {content["type"].upper()}')
    print('')
    
    # Send to each subscriber
    success_count = 0
    fail_count = 0
    
    for subscriber in active_subscribers:
        print(f'\n📧 Processing: {subscriber["email"]} ({subscriber.get("name", "No name")})')
        
        if send_email(subscriber['email'], subscriber.get('name'), content):
            success_count += 1
        else:
            fail_count += 1
    
    # Summary
    print('\n' + '='*60)
    print('📊 BATCH SUMMARY')
    print('='*60)
    print(f'✅ Successful: {success_count}')
    print(f'❌ Failed: {fail_count}')
    print(f'📧 Total: {len(active_subscribers)}')
    print(f'🕐 Sent at: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
    print('='*60 + '\n')
    
    if success_count > 0:
        print('🎉 SUCCESS! Check the inbox(es) for the email!')
        print('📱 If not in inbox, check spam/promotions folder\n')

if __name__ == '__main__':
    send_to_all_subscribers()




