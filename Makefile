NAME     := ip-calc-practice
VERSION  := v0.1.0

DSTDIR  := /srv/http
USER    := http
GROUP   := http


install:
	@command cp -fr dist/$(NAME) $(DSTDIR)/
	@chown -R $(USER):$(GROUP) $(DSTDIR)/$(NAME)

uninstall:
	@rm -f $(DSTDIR)/$(NAME)
