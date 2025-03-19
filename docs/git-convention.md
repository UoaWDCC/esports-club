### Git Formatting Conventions

**Resource**
https://www.conventionalcommits.org/en/v1.0.0/
https://mailchimp.com/developer/open-commerce/docs/git-formatting-conventions/

---

git-branching
```md
<type>-###-<yourhandle-slug>

feat-123-impactmass-permissions
fix-222-spencern-shopify-hooks
```

git-commit
```md
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**feat**

A new feature (this correlates with MINOR in Semantic Versioning)

**fix**
	
A bug fix (this correlates with PATCH in Semantic Versioning)

**docs**

Documentation only changes

**style**

Changes that do not affect the meaning of the code; for example, white-space, formatting, or missing semicolons.

**refactor**

A code change that neither fixes a bug nor adds a feature

**perf**

A code change that improves performance

**test**

Adding missing or correcting existing tests

**chore**

Changes to the build process or auxiliary tools and libraries such as documentation generation