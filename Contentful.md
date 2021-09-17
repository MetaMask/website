### How To Break Things
It is possible to add entrys into a `Section`'s body like images, cards, etc. **You can even add a section to it's own body, don't do this.** Our server will try to recursively build it and fail so you won't be able to push any updates to the site until you remove self-references within modules.

Although you *can* embed things into sections, currently not able to. So it won't break to add a `Profile` inside a `Section` but it won't do anything either except make pagees load slower.




Should I center cards on the page if they are not part of a groupd module? (see /modules-example-page/)

According to my /how-to-break-things page it is totally fine to add "featured" cards to a module container, it will revert from featured stylign to normal card automatically (why? idk but that's what happens as far as I can tell. It's ideal behaviour with unknown causes.)

