NAME     := ip-calc-practice
VERSION  := v0.0.1

DSTDIR  := /srv/http/$(NAME)
USER    := http
GROUP   := http


run:
	ng serve

#build:


install:
	@command cp -r dist/* $(DSTDIR)/
	@chown -R $(USER):$(GROUP) $(DSTDIR)

uninstall:
	@rm -f $(DSTDIR)

clean:
	@rm -rf dist/*

#.PHONY: test
#test:
#	@

