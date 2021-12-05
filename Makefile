NAME     := ip-calc-practice
VERSION  := v0.0.1

DSTDIR  := /srv/http
USER    := http
GROUP   := http


install: build
	@command cp -fr dist/$(NAME) $(DSTDIR)/
	@chown -R $(USER):$(GROUP) $(DSTDIR)/$(NAME)

uninstall:
	@rm -f $(DSTDIR)/$(NAME)
