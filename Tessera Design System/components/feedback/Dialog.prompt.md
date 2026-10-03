Modal for confirmations (switch to enforce, delete a rule). Scrim is ink at 32% with a light blur.
```jsx
<Dialog open title="Switch to enforce mode?" description="Blocked requests will return 403." onClose={close} actions={<><Button variant="ghost">Cancel</Button><Button>Enforce</Button></>} />
```
